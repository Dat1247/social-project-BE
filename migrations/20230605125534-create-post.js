"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Posts", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userID: {
				type: Sequelize.INTEGER,
				references: {
					model: "Users",
					key: "id",
				},
			},
			content: {
				type: Sequelize.STRING,
			},
			fileUpload: {
				type: Sequelize.JSON,
			},
			viewMode: {
				type: Sequelize.STRING,
				defaultValue: "Everyone",
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Posts");
	},
};
