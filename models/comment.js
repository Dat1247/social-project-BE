"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ User, Post }) {
			// define association here
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
