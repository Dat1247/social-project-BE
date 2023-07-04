const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../../config/setting");

const authenticate = (req, res, next) => {
	const token = req.header("Authorization").replace("Bearer ", "");

	try {
		const decode = jwt.verify(token, SECRET_KEY);
		if (decode) {
			req.user = decode;
			return next();
		} else {
			res.status(401).send("You are not authorized to do this!");
		}
	} catch (err) {
		res.status(403).send("You must log in!");
	}
};

module.exports = {
	authenticate,
};
