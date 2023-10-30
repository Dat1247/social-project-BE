const express = require('express');
const { Post } = require("../../models");
const { createComment, getAllComments, getCommentsOfPost } = require('../controllers/comment.controllers');
const { authenticate } = require("../middlewares/auth/authenticate");
const { checkExist } = require("../middlewares/validations/checkExist");

const commentRouter = express.Router();


commentRouter.get("/get-all-comments", getAllComments);
commentRouter.get("/get-comments-of-post/:id", checkExist(Post, "post"), getCommentsOfPost);
commentRouter.post("/create/:id", authenticate, checkExist(Post, "post"), createComment);

module.exports = {commentRouter}