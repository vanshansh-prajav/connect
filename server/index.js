require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { mongoose, User } = require('./mongo');
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
                let {password, profilePicture, ...filteredFields} = user;
                res.status(201).json({ user: {...filteredFields, profilePictureURL: profilePicture.secure_url} });
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
                bio: "Enter bio Here",
                hasImage: profilePicture !== null,
                profilePicture: null
            })
            await user.save();
            if (profilePicture) {
                imageData = await uploadImage({ userid: user._id.toString(), image: profilePicture });
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


app.listen(process.env.PORT, () => {
    console.log("Server running")
})