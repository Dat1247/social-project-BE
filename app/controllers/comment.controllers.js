const { sequelize, Comment } = require("../../models");

const createComment = async (req, res) => {
    const {user} = req;
    const {postID, content} = req.body;

    try {
        const newComment = await Comment.create({
            postID: postID,
            content,
            userID: user.id
        })

        res.status(201).send({
            message: 'Your comment has been created successfully!',
            data: newComment
        })
    }catch(err) {
        res.status(500).send(err)
    }

}

const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.findAll();
        res.status(200).send({
            message: "Get all comments successfully!",
            data: comments
        })
    } catch(err) {
        res.status(500).send(err)
    }
}

const getCommentsOfPost = async (req, res) => {
    const {item} = req;
    console.log({item})
    try {
        const comments = await Comment.findAll({
            where: {
                postID: item.id
            }
        })
        res.status(200).send({
            message: `Get all comments of post id = ${item.id} successfully!`,
            data: comments
        })
    } catch(err) {
        res.status(500).send(err)
    }
}

module.exports = {
    createComment,
    getAllComments,
    getCommentsOfPost
}