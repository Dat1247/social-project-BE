const express = require("express");
const { Friend } = require("../../models");
const {
	sendFriendRequest,
	getAllFriendRequestByUserSendId,
	answerFriendRequest,
	getAllFriendRequest,
	deleteFriend,
	getListFriendByUserId,
} = require("../controllers/friend.controllers");
const { checkExist } = require("../middlewares/validations/checkExist");
const {
	checkFriendRequest,
} = require("../middlewares/validations/checkFriendRequest");

const friendRouter = express.Router();

friendRouter.get("/get-all-request", getAllFriendRequest);
friendRouter.post(
	"/send-friend-request",
	checkFriendRequest,
	sendFriendRequest
);
friendRouter.get(
	"/get-friend-request-by-user-id",
	getAllFriendRequestByUserSendId
);
friendRouter.get("/get-list-friend", getListFriendByUserId);
friendRouter.delete("/delete-friend", deleteFriend);
friendRouter.put(
	"/answer-request/:id",
	checkExist(Friend, "friend request"),
	answerFriendRequest
);

module.exports = { friendRouter };
