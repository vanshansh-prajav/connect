const express = require('express');
const cors = require('cors');
const { User } = require('./mongo');

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
                res.status(201).json({ user });
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
    return user;
}

app.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (await findUser({ email })) {
            console.log("user exist");
            res.status(201).json("User already exists");
        }
        else {
            const user = new User({
                username: username,
                email: email,
                password: password,
                bio: "Enter bio Here"
            })
            await user.save();
            res.status(201).json("User created successfully")
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
})


app.listen(3001, () => {
    console.log("Server running on port 3001")
})