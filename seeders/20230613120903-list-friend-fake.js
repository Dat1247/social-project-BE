"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
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
					createdAt: "2023-06-13 20:00:00",
					updatedAt: "2023-06-13 20:00:00",
				},
				{
					userID: 2,
					friendID: 4,
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
