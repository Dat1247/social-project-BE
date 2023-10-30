const express = require('express');
const { Post } = require("../../models");
const { createComment } = require('../controllers/comment.controllers');
const { authenticate } = require("../middlewares/auth/authenticate");
const { checkExist } = require("../middlewares/validations/checkExist");

const commentRouter = express.Router();

commentRouter.post("/create/:id", authenticate, checkExist(Post, "post"), createComment)

module.exports = {commentRouter}