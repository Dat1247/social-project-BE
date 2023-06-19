"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Friend extends Model {
		static associate({ User }) {
			this.belongsTo(User, { foreignKey: "userID" });
			this.belongsTo(User, { foreignKey: "friendID" });
		}
	}
	Friend.init(
		{
			isFriend: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: "Friend",
		}
	);
	return Friend;
};
