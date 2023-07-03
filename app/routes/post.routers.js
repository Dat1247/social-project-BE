const express = require("express");
const { createPost } = require("../controllers/post.controllers");
const { authenticate } = require("../middlewares/auth/authenticate");
const { uploadFile } = require("../middlewares/upload/uploadFile");

const postRouter = express.Router();

postRouter.post("/create-post", authenticate, uploadFile("myFile"), createPost);

module.exports = { postRouter };
