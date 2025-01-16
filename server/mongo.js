const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/dbs").then(() => {
    console.log("MongoDB connected");
});

const userSchema = mongoose.Schema({
    username: {type: String},
    email: {type: String},
    password: {type: String},
    bio: {type: String},
    hasImage: {type: Boolean},
    profilePicture: {type: Object}
});

const User = new mongoose.model("User", userSchema, "Users");

module.exports = { mongoose, User} ;