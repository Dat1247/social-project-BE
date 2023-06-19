const express = require("express");
const { Friend } = require("../../models");
const {
	sendFriendRequest,
	getAllFriendRequestByUserSendId,
	answerFriendRequest,
	getAllFriendRequest,
	deleteFriend,
	getListFriendByUserId,
	deleteFriendRequest,
} = require("../controllers/friend.controllers");
const { checkExist } = require("../middlewares/validations/checkExist");
const {
	checkFriendRequest,
} = require("../middlewares/validations/checkFriendRequest");
const { authorize } = require("../middlewares/auth/authorize");
const { ARRAY_AUTHORS } = require("../../config/setting");
const { authenticate } = require("../middlewares/auth/authenticate");

const friendRouter = express.Router();

friendRouter.get("/get-all-request", getAllFriendRequest);
friendRouter.post(
	"/send-friend-request",
	authenticate,
	checkFriendRequest,
	sendFriendRequest
);
friendRouter.get(
	"/get-friend-request-by-user-id",
	authenticate,
	getAllFriendRequestByUserSendId
);
friendRouter.get("/get-list-friend", authenticate, getListFriendByUserId);
friendRouter.delete("/delete-friend", authenticate, deleteFriend);
friendRouter.put(
	"/answer-request/:id",
	authenticate,
	checkExist(Friend, "friend request"),
	answerFriendRequest
);
friendRouter.delete(
	"/delete-friend-request/:id",
	checkExist(Friend, "friend request"),
	authorize(ARRAY_AUTHORS),
	deleteFriendRequest
);

module.exports = { friendRouter };
