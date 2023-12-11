const express = require("express");
const { User } = require("../../models");
const {
	getUserType,
	register,
	login,
	findUser,
	updateUser,
	getAllUser,
	getUserById,
	updateUserAndType,
	deleteUser,
	getProfile,
} = require("../controllers/user.controllers");
const {
	checkUserRegister,
} = require("../middlewares/validations/checkUserRegister");
const { authenticate } = require("../middlewares/auth/authenticate");
const { checkExist } = require("../middlewares/validations/checkExist");
const { authorize } = require("../middlewares/auth/authorize");
const { ARRAY_AUTHORS } = require("../../config/setting");

const userRouter = express.Router();

userRouter.get("/get-user-type", getUserType);
userRouter.post("/register", checkUserRegister, register);
userRouter.post("/login", login);
userRouter.get("/get-all-user", getAllUser);
userRouter.get("/find-user", findUser);

userRouter.get(
	"/get-user-detail-by-id/:id",
	checkExist(User, "user"),
	getUserById
);
userRouter.get("/get-profile", getProfile);
userRouter.put(
	"/update-user/:id",
	authenticate,
	checkExist(User, "user"),
	updateUser,
	authorize(ARRAY_AUTHORS),
	updateUserAndType
);
userRouter.delete(
	"/:id",
	authenticate,
	checkExist(User, "user"),
	authorize(ARRAY_AUTHORS),
	deleteUser
);

module.exports = { userRouter };
