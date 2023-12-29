const { sequelize, Like } = require("../../models");

const getAllLikes = async (req, res) => {
    try{
        const data = await Like.findAll();
        res.status(200).send(data);
    } catch(err){
        res.status(404).send(err)
    }
}

const getLikesOfPost = async (req, res) => {
    const {item} = req;

    try {
        const data = await Like.findAll({
            where: {
                postID: item.id
            }
        })
        res.status(200).send(data)
    } catch(err){
        res.status(404).send(err);
    }
}

const likeAPost = async (req, res) => {
    const userID = req.user.id;
    const postID = req.item.id;
    try {

        const likeItem = await Like.findOne({
            where: {
                userID,
                postID
            }
        });

        if(likeItem){
            await Like.destroy({
                where: {
                    id: likeItem.id
                }
            });

            res.status(200).send({
                message: "Like's canceled successfully!",
		isLike: false
            })
        } else {
            const data = await Like.create({
                postID,
                userID,
            });

            res.status(200).send({
                message: "Like post has been created successfully!",
		isLike: true,
                data: data
            })
        }

    } catch (err) {
        res.status(403).send(err);
    }
}

module.exports = {
    getAllLikes,getLikesOfPost,likeAPost
}