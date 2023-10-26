const checkIsYour = async (req, res, next) => {
	const { item, user } = req;
	if (item.userID === user.id) {
		next();
	} else {
		res.status(401).send("You don't have authorize to this feature!");
	}
};

module.exports = { checkIsYour };
