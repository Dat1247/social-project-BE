"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		static associate({ User, Post }) {
			this.belongsTo(User, { foreignKey: "userID" });
			this.belongsTo(Post, { foreignKey: "postID" });
		}
	}
	Comment.init(
		{
			content: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Comment",
		}
	);
	return Comment;
};
