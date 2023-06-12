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
		await queryInterface.bulkInsert("Users", [
			{
				name: "admin",
				email: "admin@gmail.com",
				password:
					"$2a$15$YNlVk4XT43QIqPhqpTwn3u2oFrMfx7DOECSkClQDZb6C4eDQ5bv5y",
				phoneNumber: "0123456789",
				userType: "ADMIN",
				avatar: "https://gravatar.com/avatar/75d23af433e0cea4c0e45a56dba18b30",
				createdAt: "2023-06-07 12:37:25",
				updatedAt: "2023-06-07 12:37:25",
			},
			{
				name: "nva",
				email: "nva@gmail.com",
				password: "$15$hhpQ5C3lTy3RNSqIG220AuFM3211TLBxm80yvJjdMqOaNN2KlD2Pu",
				phoneNumber: "0123456789",
				userType: "CLIENT",
				avatar: "https://gravatar.com/avatar/fb0a99981234ee03caa8cb3604184a2c",
				createdAt: "2023-06-07 12:37:57",
				updatedAt: "2023-06-07 12:37:57",
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Users", null, {});
	},
};
