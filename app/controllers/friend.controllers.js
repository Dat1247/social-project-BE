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
		SELECT Friends.id as requestID, Friends.userID as userSendID, Friends.friendID as userReceiveID, Friends.isFriend, Friends.createdAt, Friends.updatedAt, 
			userSend.name as userSendName, userSend.email as userSendEmail, userSend.phoneNumber as userSendPhone, userSend.avatar as userSendAvatar,
			userReceive.name as userReceiveName, userReceive.email as userReceiveEmail, userReceive.phoneNumber as userReceivePhone, userReceive.avatar as userReceiveAvatar
			FROM Friends
		INNER JOIN Users AS userSend ON userSend.id = Friends.userID
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
	answerFriendRequest,
	deleteFriend,
};
