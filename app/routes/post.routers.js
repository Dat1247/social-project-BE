const express = require("express");
const { Post } = require("../../models");
const {
	createPost,
	getPost,
	deletePostById,
} = require("../controllers/post.controllers");
const { authenticate } = require("../middlewares/auth/authenticate");
const { uploadFile } = require("../middlewares/upload/uploadFile");
const { checkExist } = require("../middlewares/validations/checkExist");
const { checkIsYour } = require("../middlewares/validations/checkIsYour");

const postRouter = express.Router();

postRouter.get("/", authenticate, getPost);
postRouter.post("/create-post", authenticate, uploadFile("myFile"), createPost);
postRouter.delete(
	"/:id",
	authenticate,
	checkExist(Post, "post"),
	checkIsYour,
	deletePostById
);

module.exports = { postRouter };
