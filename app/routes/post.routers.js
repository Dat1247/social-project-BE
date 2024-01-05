const express = require("express");
const { Post } = require("../../models");
const {
	createPost,
	deletePostById,
	getPosts,
	updatePost,
	getAllPosts,
	changeStatusPost,
	getPostById
} = require("../controllers/post.controllers");
const { authenticate } = require("../middlewares/auth/authenticate");
const { uploadFile } = require("../middlewares/upload/uploadFile");
const { checkExist } = require("../middlewares/validations/checkExist");
const { checkIsYour } = require("../middlewares/validations/checkIsYour");

const postRouter = express.Router();

postRouter.get("/get-all-posts", getAllPosts)
postRouter.get("/", authenticate, getPosts);
postRouter.post("/create-post", authenticate, uploadFile("myFile"), createPost);
postRouter.get("/get-post-by-id/:id", checkExist(Post, "post"), getPostById);
postRouter.put("/update-post/:id", authenticate, checkExist(Post, "post"), checkIsYour,uploadFile("myFile"), updatePost)
postRouter.delete(
	"/:id",
	authenticate,
	checkExist(Post, "post"),
	checkIsYour,
	deletePostById
);
postRouter.put("/change-status/:id", authenticate, checkExist(Post, "post"), checkIsYour, changeStatusPost)

module.exports = { postRouter };
