"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class userType extends Model {
		static associate(models) {}
	}
	userType.init(
		{
			value: DataTypes.STRING,
			name: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "userType",
		}
	);
	return userType;
};
