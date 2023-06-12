"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Friend extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ User }) {
			// define association here
			this.belongsTo(User, { foreignKey: "userID" });
			this.belongsTo(User, { foreignKey: "friendID" });
		}
	}
	Friend.init(
		{},
		{
			sequelize,
			modelName: "Friend",
		}
	);
	return Friend;
};
