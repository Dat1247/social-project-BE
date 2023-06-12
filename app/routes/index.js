const express = require("express");
const { userRouter } = require("./user.routers");

const rootRouter = express.Router();

rootRouter.use("/user", userRouter);

module.exports = {
	rootRouter,
};
