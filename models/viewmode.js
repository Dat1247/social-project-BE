"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class view_mode extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	view_mode.init(
		{
			value: DataTypes.STRING,
			description: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "viewMode",
		}
	);
	return view_mode;
};
