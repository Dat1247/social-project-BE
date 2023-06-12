const checkExist = (model, key) => {
	return async (req, res, next) => {
		const { id } = req.params;
		const item = await model.findOne({
			where: {
				id,
			},
		});
		if (item) {
			req.item = item;
			next();
		} else {
			res.status(404).send(`Not found ${key} have id = ${id}`);
		}
	};
};

module.exports = {
	checkExist,
};
