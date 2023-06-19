"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Tag extends Model {
		static associate({ TagPost }) {
			this.hasMany(TagPost, { foreignKey: "tagID" });
		}
	}
	Tag.init(
		{
			taskName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Tag",
		}
	);
	return Tag;
};
