const express = require('express');
const {Like, Post} = require('../../models');

const { getAllLikes, getLikesOfPost, likeAPost } = require('../controllers/like.controllers');
const { checkExist } = require("../middlewares/validations/checkExist");
const { authenticate } = require('../middlewares/auth/authenticate');


const likeRouter = express.Router();

likeRouter.get("/get-all-likes", getAllLikes);
likeRouter.get("/get-like/:id", checkExist(Post, "post"), getLikesOfPost);
likeRouter.post("/like-post/:id",authenticate, checkExist(Post, "post"), likeAPost)

module.exports = {
    likeRouter
}