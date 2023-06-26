"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		static associate({ User, Like, Comment, TagPost }) {
			this.belongsTo(User, { foreignKey: "userID" });
			this.hasMany(Like, { foreignKey: "postID" });
			this.hasMany(Comment, { foreignKey: "postID" });
			this.hasMany(TagPost, { foreignKey: "postID" });
		}
	}
	Post.init(
		{
			content: DataTypes.STRING,
			fileUpload: DataTypes.JSON,
			viewMode: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Post",
		}
	);
	return Post;
};
