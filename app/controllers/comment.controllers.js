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

}

module.exports = {
    createComment
}