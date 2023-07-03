const express = require("express");
const { createPost } = require("../controllers/post.controllers");
const { authenticate } = require("../middlewares/auth/authenticate");

const postRouter = express.Router();

postRouter.post("/create-post", authenticate, createPost);

module.exports = { postRouter };
