require('dotenv').config();
const express = require('express');
const cors = require('cors');
const speakeasy = require('speakeasy')
const nodemailer = require('nodemailer')
const { mongoose, User, Post, Secret } = require('./mongo');
const { uploadImage } = require('./cloudinaryutil');
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", cors(), (req, res) => {
    console.log("Server is up and running");
})

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findUser({ email });
        if (user != null) {
            if (user.password === password) {
                let { password, profilePicture, ...filteredFields } = user;
                res.status(201).json({ user: { ...filteredFields, profilePictureURL: user.hasImage ? profilePicture : null } });
            }
            else {
                throw new Error("Password Does not match");
            }
        }
        else {
            throw new Error("User does not exist");
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
})

const findUser = async ({ email }) => {
    const user = await User.findOne({ email });
    if (user === null)
        return false;
    return user.toObject();
}

const generateOTP = ({ secret, encoding }) => {
    const otp = speakeasy.totp({
        secret: secret,
        encoding: 'base32'
    });
    return otp;
}

const sendEmailOTP = async ({ email, otp }) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',  // Adjust this according to your email service
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_CRED_EMAIL,
            pass: process.env.MAIL_CRED_PASS
        }
    });

    await transporter.sendMail({
        from: `"OTP Service" ${process.env.MAIL_CRED_EMAIL}`,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`
    });
}


app.post("/initiateverification", async (req, res) => {
    try {
        const { email } = req.body;
        const twofa = speakeasy.generateSecret();
        const secret = new Secret({
            email: email,
            twoFactorSecret: twofa
        })
        secret.save();
        const otp = generateOTP({ secret: secret.twoFactorSecret.base32, encoding: "base32" });
        await sendEmailOTP({ email, otp });
        res.status(201).json("OTP sent");
    } catch (error) {
        res.status(400).json(error.message);
    }
})

const verifyOTP = ({ secret, otp }) => {
    const verified = speakeasy.totp.verify({
        secret: secret,  // Use a secure key in production
        encoding: 'base32',
        token: otp,
        window: 2
    });
    return verified;
}

app.post("/verify", async (req, res) => {
    try {
        const { email, otp } = req.body;
        const secret = (await Secret.findOne({ email }).select("twoFactorSecret.base32")).twoFactorSecret.base32;
        const verified = verifyOTP({ secret, otp });
        if (verified) {
            res.status(201).json("Verified");
        }
        else {
            throw new Error("OTP did not match");
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
})

app.post("/signup", async (req, res) => {
    try {
        const { username, email, password, profilePicture } = req.body;
        if (await findUser({ email })) {
            console.log("user exist");
            res.status(201).json("User already exists");
        }
        else {
            let imageData = null;
            const user = new User({
                username: username,
                email: email,
                password: password,
                bio: "",
                hasImage: profilePicture !== null,
                profilePicture: null
            })
            await user.save();
            if (profilePicture) {
                imageData = await uploadImage({ folderid: user._id.toString(), image: profilePicture, type: 'profilePicture' });
                await User.findByIdAndUpdate(
                    user._id,
                    { $set: { profilePicture: imageData } },
                    { new: true }
                );
            }
            res.status(201).json("User created successfully")
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
})

app.post('/publishpost', async (req, res) => {
    const { userId, postTitle, postDescription, postTags, allowComments, uploadedImage } = req.body;
    console.log(userId);
    try {
        const post = new Post({
            userId: userId,
            title: postTitle,
            description: postDescription,
            postTags: postTags,
            likes: 0,
            allowComments: allowComments,
            postImage: null,
            comments: []
        });
        post.save();
        let imageData = await uploadImage({ folderid: userId.toString(), image: uploadedImage, type: 'posts' });
        await Post.findByIdAndUpdate(
            post._id,
            { $set: { postImage: imageData } },
            { new: true }
        );
        res.status(201).json("Post Published succesfully")
    } catch (e) {
        res.status(400).json(e.message);
    }
})

app.get('/getposts', async (req, res) => {
    try {
        const posts = await Post.find({}).select("_id postImage");
        res.status(201).json(JSON.stringify(posts));
    } catch (error) {
        res.status(400).json(error.message);
    }
})

app.post('/getpost', async (req, res) => {
    try {
        const { id } = req.body;
        const post = await Post.findById(id);
        res.status(201).json(JSON.stringify(post));
    } catch (error) {
        res.status(400).json(error.message);
    }
})

app.post("/postcomment", async (req, res) => {
    const { id, comment, userId } = req.body;
    try {
        const comments = (await Post.findById(id).select("comments")).comments;
        const { username, profilePicture } = await User.findById(userId).select("username profilePicture")
        const formatted = {
            username: username,
            profilePicture: profilePicture,
            comment: comment
        }
        comments.push(formatted);

        await Post.findByIdAndUpdate(
            id,
            { $set: { comments: comments } },
            { new: true }
        )
        res.status(201).json(JSON.stringify(comments));
    } catch (error) {
        console.log(error);
        res.status(400).json("Commnet failed to be added");
    }
})

app.listen(process.env.PORT, () => {
    console.log("Server running")
})