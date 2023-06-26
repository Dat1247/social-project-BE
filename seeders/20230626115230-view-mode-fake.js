"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"viewModes",
			[
				{
					value: "Everyone",
					description: "All people will see your post",
					createdAt: "2023-06-13T12:18:49.000Z",
					updatedAt: "2023-06-13T12:18:49.000Z",
				},
				{
					value: "Friend",
					description: "Only your friend can see your post",
					createdAt: "2023-06-13T12:18:49.000Z",
					updatedAt: "2023-06-13T12:18:49.000Z",
				},
				{
					value: "Only me",
					description: "Only you can see your post",
					createdAt: "2023-06-13T12:18:49.000Z",
					updatedAt: "2023-06-13T12:18:49.000Z",
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("viewModes", null, {});
	},
};
