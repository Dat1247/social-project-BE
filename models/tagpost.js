"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class TagPost extends Model {
		static associate({ Tag, Post }) {
			this.belongsTo(Tag, { foreignKey: "tagID" });
			this.belongsTo(Post, { foreignKey: "postID" });
		}
	}
	TagPost.init(
		{},
		{
			sequelize,
			modelName: "TagPost",
		}
	);
	return TagPost;
};
