const { sequelize, Friend } = require("../../models");
const { Op } = require("sequelize");

const sendFriendRequest = async (req, res) => {
	const { userSendId, userReceiveId } = req.body;
	try {
		const newFriend = await Friend.create({
			userID: userSendId,
			friendID: userReceiveId,
		});
		res.status(200).send("Friend request has been sent");
	} catch (err) {
		res.status(500).send(err);
	}
};

const getAllFriendRequest = async (req, res) => {
	const { userId } = req.body;
	try {
		const [result] = await sequelize.query(`
			SELECT * FROM Friends
			WHERE Friends.userID = ${userId} AND (Friends.isFriend = false OR Friends.isFriend IS NULL)
		`);

		res.status(200).send({
			message: "Get friend request successfully!",
			data: result,
		});
	} catch (err) {
		res.status(500).send(err);
	}
};

const acceptFriend = async (req, res) => {};

const rejectFriend = async (req, res) => {
	const { id } = req.params;
	try {
		await Friend.destroy({
			where: {
				id,
			},
		});
		res.status(200).send("You declined the friend request!");
	} catch (err) {
		res.status(500).send(err);
	}
};

module.exports = {
	sendFriendRequest,
	getAllFriendRequest,
	acceptFriend,
	rejectFriend,
};
