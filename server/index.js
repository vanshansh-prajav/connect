require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { mongoose, User, Post, commentSchema } = require('./mongo');
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
                res.status(201).json({ user: { ...filteredFields, profilePictureURL: user.hasImage ? profilePicture.secure_url : null } });
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
                imageData = await uploadImage({ folderid: user._id.toString(), image: profilePicture });
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
    const { postTitle, postDescription, postTags, allowComments, uploadedImage } = req.body;
    try {
        const post = new Post({
            title: postTitle,
            decription: postDescription,
            postTags: postTags,
            likes: 0,
            allowComments: allowComments,
            postImage: null,
            comments: []
        });
        post.save();
        let imageData = await uploadImage({ folderid: post._id.toString(), image: uploadedImage });
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
        const posts = await Post.find({}).select("_id postImage.secure_url");
        res.status(201).json(JSON.stringify(posts));
    } catch (error) {
        res.status(400).json(error.message);
    }
})

app.post('/getpost', async (req, res) => {
    try {
        const {id} = req.body;
        const post = await Post.findById(id);
        res.status(201).json(JSON.stringify(post));
    } catch (error) {
        res.status(400).json(error.message);
    }
})

app.listen(process.env.PORT, () => {
    console.log("Server running")
})