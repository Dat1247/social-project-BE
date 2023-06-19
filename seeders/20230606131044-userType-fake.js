"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"userTypes",
			[
				{
					value: "ADMIN",
					name: "ADMIN",
					createdAt: "2023-06-6 20:00:00",
					updatedAt: "2023-06-6 20:00:00",
				},
				{
					value: "CLIENT",
					name: "CLIENT",
					createdAt: "2023-06-6 20:00:00",
					updatedAt: "2023-06-6 20:00:00",
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("userTypes", null, {});
	},
};
