const authorize = (arr_type) => {
	return async (req, res, next) => {
		const { user } = req;

		if (arr_type.findIndex((item) => item === user.userType) > -1) {
			next();
		} else {
			res.status(403).send("You don't have authorize to this feature!");
		}
	};
};

module.exports = { authorize };
