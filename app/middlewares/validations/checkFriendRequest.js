const { Op } = require("sequelize");
const { sequelize, Friend } = require("../../../models");

const checkFriendRequest = async (req, res, next) => {
	const { userSendId, userReceiveId } = req.body;
	const friendReq = await Friend.findOne({
		where: {
			[Op.or]: [
				{
					userID: userSendId,
					friendID: userReceiveId,
				},
				{
					userID: userReceiveId,
					friendID: userSendId,
				},
			],
		},
	});

	if (!friendReq) {
		next();
	} else if (friendReq.dataValues.isFriend) {
		res.status(500).send({
			message: "Friend request sent failed!",
			content: "You are already friends!",
		});
	} else {
		res.status(500).send({
			message: "Friend request sent failed!",
			content: "The friend request already exists!",
		});
	}
};

module.exports = {
	checkFriendRequest,
};
