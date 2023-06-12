"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class TagPost extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Tag, Post }) {
			// define association here
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
