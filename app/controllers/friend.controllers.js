const { sequelize, Friend } = require("../../models");
const { Op } = require("sequelize");

const getAllFriendRequest = async (req, res) => {
	try {
		const listFriendRequest = await Friend.findAll();
		res.status(200).send(listFriendRequest);
	} catch (err) {
		res.status(500).send(err);
	}
};

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

const getAllFriendRequestByUserSendId = async (req, res) => {
	const { userId } = req.body;
	try {
		const [result] = await sequelize.query(`
		SELECT Friends.id AS requestID, Friends.userID AS userSendID, Friends.friendID AS userReceiveID, Friends.isFriend, Friends.createdAt, Friends.updatedAt,
			userReceive.name AS userReceiveName, userReceive.email AS userReceiveEmail, userReceive.phoneNumber AS userReceivePhone, userReceive.avatar AS userReceiveAvatar
			FROM Friends
		INNER JOIN Users AS userReceive ON userReceive.id = Friends.friendID
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

const getListFriendByUserId = async (req, res) => {
	const { userId } = req.body;

	try {
		const [result] = await sequelize.query(`
		SELECT Friends.id AS requestID, Friends.userID AS userSendID, Friends.friendID AS userReceiveID, Friends.isFriend, Friends.createdAt, Friends.updatedAt,
			friend.name AS friendName, friend.email AS friendEmail, friend.phoneNumber AS friendPhone, friend.avatar AS friendAvatar
			FROM Friends
		INNER JOIN Users AS friend ON friend.id = Friends.friendID
		WHERE Friends.userID = ${userId} AND Friends.isFriend = true
		`);

		res.status(200).send({
			message: "Get list friend successfully!",
			data: result,
		});
	} catch (err) {
		res.status(500).send(err);
	}
};

const answerFriendRequest = async (req, res) => {
	const { id } = req.params;
	const { isAccept } = req.body;
	try {
		if (isAccept) {
			const friendRequest = await Friend.findOne({
				where: {
					id,
				},
			});

			friendRequest.isFriend = true;
			await friendRequest.save();
			res.status(200).send({
				message: "You accepted the request!",
				data: friendRequest,
			});
		} else {
			await Friend.destroy({
				where: {
					id,
				},
			});
			res.status(200).send("You declined the friend request!");
		}
	} catch (err) {
		res.status(500).send(err);
	}
};

const deleteFriend = async (req, res) => {
	const { userID, friendID } = req.body;

	try {
		await Friend.destroy({
			where: {
				[Op.or]: [
					{
						userID: userID,
						friendID: friendID,
					},
					{
						userID: friendID,
						friendID: userID,
					},
				],
			},
		});
		res.status(200).send({
			message: "Delete friend successfully!",
		});
	} catch (err) {
		res.status(500).send(err);
	}
};

module.exports = {
	getAllFriendRequest,
	sendFriendRequest,
	getAllFriendRequestByUserSendId,
	getListFriendByUserId,
	answerFriendRequest,
	deleteFriend,
};
