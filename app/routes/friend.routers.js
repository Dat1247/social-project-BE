const express = require("express");
const { Friend } = require("../../models");
const {
	sendFriendRequest,
	getAllFriendRequest,

	answerFriendRequest,
} = require("../controllers/friend.controllers");
const { checkExist } = require("../middlewares/validations/checkExist");

const friendRouter = express.Router();

friendRouter.post("/send-friend-request", sendFriendRequest);
friendRouter.get("/get-all-friend-request", getAllFriendRequest);
friendRouter.put(
	"/answer-request/:id",
	checkExist(Friend, "friend request"),
	answerFriendRequest
);

module.exports = { friendRouter };
