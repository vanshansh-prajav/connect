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
    profilePicture: {type: String}
});
const User = new mongoose.model("User", userSchema, "Users");

const postSchema = mongoose.Schema({
    userId: {type: String},
    title: {type: String},
    description: {type: String},
    postTags: {type: Array},
    likes: {type: Number},
    allowComments: {type: Boolean},
    postImage: {type: String},
    comments: {type: Array},
})
const Post = new mongoose.model("Post", postSchema, "Posts");

const secretSchema = mongoose.Schema({
    email: {type: String},
    twoFactorSecret: {type: Object}
})

const Secret = new mongoose.model("Secret", secretSchema, "Secrets");

module.exports = { mongoose, User, Post, Secret } ;