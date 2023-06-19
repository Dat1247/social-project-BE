"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Like extends Model {
		static associate({ User, Post }) {
			this.belongsTo(User, { foreignKey: "userID" });
			this.belongsTo(Post, { foreignKey: "postID" });
		}
	}
	Like.init(
		{},
		{
			sequelize,
			modelName: "Like",
		}
	);
	return Like;
};
