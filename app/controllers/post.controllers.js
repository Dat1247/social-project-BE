const { Post } = require("../../models");

const createPost = async (req, res) => {
	const { content, fileUpload, viewMode } = req.body;
	const { user } = req;
	try {
		const newPost = await Post.create({
			content,
			fileUpload,
			viewMode,
			userID: user.id,
		});
		res.status(201).send(newPost);
	} catch (err) {
		res.status(500).send(err);
	}
};

module.exports = { createPost };
