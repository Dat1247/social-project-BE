"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ User, Like, Comment, TagPost }) {
			// define association here
			this.belongsTo(User, { foreignKey: "userID" });
			this.hasMany(Like, { foreignKey: "postID" });
			this.hasMany(Comment, { foreignKey: "postID" });
			this.hasMany(TagPost, { foreignKey: "postID" });
		}
	}
	Post.init(
		{
			content: DataTypes.STRING,
			videoUrl: DataTypes.STRING,
			imageUrl: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Post",
		}
	);
	return Post;
};
