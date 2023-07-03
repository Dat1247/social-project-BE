const { Post } = require("../../models");

const getPost = async (req, res) => {
	const { user } = req;

	console.log({ user });
	try {
		const result = await Post.findAll();
		res.status(200).send(result);
	} catch (err) {
		res.status(500).send(err);
	}
};

const createPost = async (req, res) => {
	const { content, viewMode } = req.body;
	const { user, files } = req;
	const fileArray = [];
	try {
		if (files.length > 0) {
			files.forEach((file) => {
				const pathName = `${file.destination}/${file.filename}`;
				fileArray.push(pathName);
			});
		}
		const newPost = await Post.create({
			content,
			fileUpload: fileArray,
			viewMode,
			userID: user.id,
		});
		res.status(201).send(newPost);
	} catch (err) {
		res.status(500).send(err);
	}
};

module.exports = { createPost, getPost };
