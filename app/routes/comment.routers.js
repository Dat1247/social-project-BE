const express = require('express');
const { Post, Comment } = require("../../models");
const { createComment, getAllComments, getCommentsOfPost, deleteComment } = require('../controllers/comment.controllers');
const { authenticate } = require("../middlewares/auth/authenticate");
const { checkExist } = require("../middlewares/validations/checkExist");
const { checkIsYour } = require('../middlewares/validations/checkIsYour');

const commentRouter = express.Router();


commentRouter.get("/get-all-comments", getAllComments);
commentRouter.get("/get-comments-of-post/:id", checkExist(Post, "post"), getCommentsOfPost);
commentRouter.post("/create/:id", authenticate, checkExist(Post, "post"), createComment);
commentRouter.delete("/delete-comment/:id", authenticate, checkExist(Comment, "comment"), checkIsYour, deleteComment);

module.exports = {commentRouter}