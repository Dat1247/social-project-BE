const { sequelize, Post, Comment } = require("../../models");
const { Op } = require("sequelize");

const getAllPosts = async (req, res) => {

	try {
		const result = await Post.findAll();
		res.status(200).send(result);
	} catch (err) {
		res.status(500).send(err);
	}
};

const getCountCommentOfPost = async(arr, model) => {
	let newArr = []
		for(const item of arr) {
			const result = await model.count({
				where: {
					postID: {
						[Op.eq]: item.postID
					}
				}
			});
			newArr.push({...item, numberOfComment: result});

		}
	return newArr;
}

const getPosts = async (req, res) => {
	let arrPost = [];
	let newArrPost = []

	try {
		const [result1] = await sequelize.query(`
			SELECT Posts.id AS postID, Users.id AS Author_Id, Posts.content AS content, Posts.fileUpload AS FileUpload, Posts.viewMode AS ViewMode, count(likes.userID) AS numberOfLike,  Users.name AS authorName, Users.username AS authorUsername, Users.avatar AS authorAvatar, Posts.createdAt, Posts.updatedAt FROM Posts
			INNER JOIN Friends AS friend
			ON (friend.userID = "1" && friend.friendID = Posts.userID && friend.isFriend = '1' AND (Posts.viewMode = "Friend" || Posts.viewMode = "friends")) 
			|| (friend.friendID = "1" && friend.userID = Posts.userID && friend.isFriend = '1' AND (Posts.viewMode = "Friend" || Posts.viewMode = "friends"))
			INNER JOIN Users ON Users.id = Posts.userID
			LEFT JOIN Likes ON Likes.postID = Posts.id
			GROUP BY Posts.id;
		`);

		const [result2] = await sequelize.query(`
			SELECT Posts.id AS postID, Users.id AS authorId, Posts.content AS content, Posts.fileUpload AS FileUpload, Posts.viewMode AS ViewMode, count(likes.userID) AS numberOfLike,  Users.name AS authorName, Users.username AS authorUsername, Users.avatar AS authorAvatar, Posts.createdAt, Posts.updatedAt FROM Posts
			INNER JOIN Users ON Users.id = Posts.userID 
			LEFT JOIN Likes ON Likes.postID = Posts.id
			WHERE (Posts.viewMode = 'Everyone')
			|| (Posts.viewMode = 'Only me' && Posts.userID = '1') 
			|| ((Posts.viewMode = "Friend" || Posts.viewMode = "friends") && Posts.userID = '1')
			GROUP BY Posts.id;
		`);

		arrPost = [...result1, ...result2].sort((a,b) => {
			return b.updatedAt - a.updatedAt;
		})

		newArrPost = await getCountCommentOfPost(arrPost, Comment);

		res.status(200).send(newArrPost)
	} catch(err) {
		res.status(500).send(err);
	}
}

const getPostById = async (req, res) => {
	const {item} = req;

	try {
		const [result] = await sequelize.query(`
		SELECT Posts.id AS postID, Users.id AS authorId, Posts.content AS content, Posts.fileUpload AS FileUpload, Posts.viewMode AS ViewMode, Users.name AS authorName, Users.username AS authorUsername, Users.avatar AS authorAvatar, Posts.createdAt, Posts.updatedAt FROM Posts
					LEFT JOIN Users ON Users.id = Posts.userID 
					WHERE Posts.id = ${item.id};
		`);
		const [result2] = await sequelize.query(`
			SELECT Comments.id AS idComment, Comments.userID AS authorCommentId, Users.name AS authorNameComment, Users.username AS authorUsernameComment, Users.avatar AS authorAvatarComment, Comments.content AS contentComment, Comments.createdAt AS createdAtComment, Comments.updatedAt AS updatedAtComment FROM Comments
			INNER JOIN Users ON Users.id = Comments.userID
			WHERE Comments.postID = ${item.id}
			ORDER BY updatedAtComment DESC
		`)
		const [result3] = await sequelize.query(`
			SELECT Likes.id AS idLike, Likes.userID AS authorLikeId, Users.name AS authorNameLike, Users.username AS authorUsernameLike, Users.avatar AS authorAvatarLike, Likes.createdAt AS createdAtLike, Likes.updatedAt AS updatedAtLike FROM Likes
			INNER JOIN Users ON Users.id = Likes.userID
			WHERE Likes.postID = ${item.id}
		`)
		const post = {...result[0], comments: result2, likes: result3, numberComment: result2.length, numberLike: result3.length}
		res.status(200).send(post);
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

const changeStatusPost = async (req, res) => {
	const {item} = req;
	const {viewMode} = req.body;

	try {
		item.viewMode = viewMode;
		await item.save();

		res.status(200).send({
			message: "Update status post successfully!",
			data: item,
		})
	} catch (err) {
		res.status(500).send("Can't change status of post!");
	}
}

const updatePost = async (req, res) => {
	const {item, files} = req;
	const { content, viewMode, arrayFileUpload } = req.body;

	let convertArrayFileUpload = arrayFileUpload.split(',')
	try {
		if (files.length > 0) {
			files.forEach((file) => {
				const pathName = `${file.destination}/${file.filename}`;
				convertArrayFileUpload.push(pathName);
			});
		}

		if(convertArrayFileUpload.length > 0) {
			item.fileUpload = convertArrayFileUpload;
		}

		item.content = content;
		item.viewMode = viewMode;

		await item.save();

		res.status(200).send({
			message: "Update post successfully!",
			data: item,
		});
	} catch (err) {
		res.status(500).send({message:"Update post failed!", data: err})
	}

}

module.exports = { createPost, deletePostById, getPosts, updatePost, getAllPosts, changeStatusPost, getPostById };
