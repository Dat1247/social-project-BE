const express = require("express");
const { Friend } = require("../../models");
const {
	sendFriendRequest,
	getAllFriendRequest,
	rejectFriend,
} = require("../controllers/friend.controllers");

const friendRouter = express.Router();

friendRouter.post("/send-friend-request", sendFriendRequest);
friendRouter.get("/get-all-friend-request", getAllFriendRequest);
friendRouter.delete("/:id", rejectFriend);

module.exports = { friendRouter };
