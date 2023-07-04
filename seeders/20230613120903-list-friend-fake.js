"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Friends",
			[
				{
					userID: 1,
					friendID: 2,
					createdAt: "2023-06-13 20:00:00",
					updatedAt: "2023-06-13 20:00:00",
				},
				{
					userID: 1,
					friendID: 3,
					isFriend: true,
					createdAt: "2023-06-13 20:00:00",
					updatedAt: "2023-06-13 20:00:00",
				},
				{
					userID: 1,
					friendID: 4,
					isFriend: true,
					createdAt: "2023-06-13 20:00:00",
					updatedAt: "2023-06-13 20:00:00",
				},
				{
					userID: 2,
					friendID: 4,
					createdAt: "2023-06-13 20:00:00",
					updatedAt: "2023-06-13 20:00:00",
				},
				{
					userID: 2,
					friendID: 3,
					createdAt: "2023-06-13 20:00:00",
					updatedAt: "2023-06-13 20:00:00",
				},
				{
					userID: 5,
					friendID: 1,
					isFriend: true,
					createdAt: "2023-06-13 20:00:00",
					updatedAt: "2023-06-13 20:00:00",
				},
				{
					userID: 5,
					friendID: 6,
					isFriend: true,
					createdAt: "2023-06-13 20:00:00",
					updatedAt: "2023-06-13 20:00:00",
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Friends", null, {});
	},
};
