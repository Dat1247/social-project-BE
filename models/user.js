"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Friend, Post, Like, Comment }) {
			// define association here
			this.hasMany(Friend, { foreignKey: "userID" });
			this.hasMany(Friend, { foreignKey: "friendID" });
			this.hasMany(Post, { foreignKey: "userID" });
			this.hasMany(Like, { foreignKey: "userID" });
			this.hasMany(Comment, { foreignKey: "userID" });
		}
	}
	User.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			phoneNumber: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			avatar: {
				type: DataTypes.STRING,
			},
			userType: {
				type: DataTypes.STRING,
			},
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
