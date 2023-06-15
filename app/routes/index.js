const express = require("express");
const { userRouter } = require("./user.routers");
const { friendRouter } = require("./friend.routers");

const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/friend", friendRouter);

module.exports = {
	rootRouter,
};
