const express = require("express");
const { userRouter } = require("./user.routers");
const { friendRouter } = require("./friend.routers");
const { postRouter } = require("./post.routers");
const { likeRouter } = require("./like.routers");

const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/friend", friendRouter);
rootRouter.use("/post", postRouter);
rootRouter.use("/like", likeRouter);

module.exports = {
	rootRouter,
};
