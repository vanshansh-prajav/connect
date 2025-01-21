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

const postSchema = mongoose.Schema({
    title: {type: String},
    decription: {type: String},
    postTags: {type: Array},
    likes: {type: Number},
    allowComments: {type: Boolean},
    postImage: {type: Object},
    comments: {type: Array},
})
const Post = new mongoose.model("Post", postSchema, "Posts");

const commentSchema = mongoose.Schema({
    name: {type: String},
    comment: {type: String}
})

module.exports = { mongoose, User, Post, commentSchema } ;