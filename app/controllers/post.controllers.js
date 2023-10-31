const { sequelize, Post, Like } = require("../../models");
const { Op } = require("sequelize");

const getAllPosts = async (req, res) => {
	const { user } = req;
	try {
		const result = await Post.findAll();
		res.status(200).send(result);
	} catch (err) {
		res.status(500).send(err);
	}
};

const getPosts = async (req, res) => {
	let arrPost = []
	let arrPosts = [];
	try {
		const [result1] = await sequelize.query(`
			SELECT Posts.id AS postID, Posts.content AS content, Posts.userID AS Author_Id, Posts.fileUpload AS FileUpload,
			 Posts.viewMode AS ViewMode, Posts.createdAt, Posts.updatedAt FROM Posts
			INNER JOIN Friends AS friend
			ON (friend.userID = "1" && friend.friendID = Posts.userID && friend.isFriend = '1' AND Posts.viewMode = "Friend") 
			|| (friend.friendID = "1" && friend.userID = Posts.userID && friend.isFriend = '1' AND Posts.viewMode = "Friend");
		`);

		const [result2] = await sequelize.query(`
			SELECT  Posts.id AS postID, Posts.content AS content, Posts.userID AS Author_Id, Posts.fileUpload AS FileUpload, Posts.viewMode AS ViewMode, 
			Posts.createdAt, Posts.updatedAt FROM Posts
			WHERE (Posts.viewMode = 'Everyone') 
			|| (Posts.viewMode = 'Only me' && Posts.userID = '1') 
			|| (Posts.viewMode = 'Friend' && Posts.userID = '1');
		`);

		arrPost = [...result1, ...result2].sort((a,b) => {
			return b.createdAt - a.createdAt;
		})



		arrPost.forEach(async (item, index) => {
			const numberOfLike = await Like.count({
				where: {
					postID: item.postID
				}
			})

			arrPosts.push({...item, numberOfLike})
		})

		// console.log({arrPosts})


		res.status(200).send(arrPosts)
	} catch(err) {
		res.status(500).send(err);
	}
}

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

const updatePost = async (req, res) => {
	const {item, files} = req;
	const { content, viewMode } = req.body;

	const fileArray = []

	try {
		if (files.length > 0) {
			files.forEach((file) => {
				const pathName = `${file.destination}/${file.filename}`;
				fileArray.push(pathName);
			});
		}

		if(fileArray.length > 0) {
			item.fileUpload = fileArray;
		}
		item.content = content;
		item.viewMode = viewMode;

		await item.save();

		res.status(200).send({
			message: "Update post successfully!",
			data: item,
		});
	} catch (err) {
		res.status(500).send("Update post failed!")
	}

}

const deletePostById = async (req, res) => {
	const { item, user } = req;

	try {
		await Post.destroy({
			where: {
				id: item.id,
			},
		});
		res.status(200).send({
			message: "Delete post successfully!",
			post: item,
		});
	} catch (err) {
		res.status(500).send(err);
	}
};

module.exports = { createPost, deletePostById, getPosts, updatePost, getAllPosts };
