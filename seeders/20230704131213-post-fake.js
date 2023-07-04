"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Posts",
			[
				{
					userID: 6,
					content: "Test create post 1",
					fileUpload: JSON.stringify([]),
					viewMode: "Friend",
					updatedAt: "2023-07-04 13:04:07",
					createdAt: "2023-07-04 13:04:07",
				},
				{
					userID: 6,
					content: "Test create post 2",
					fileUpload: JSON.stringify([]),
					viewMode: "Only me",
					updatedAt: "2023-07-04 13:05:01",
					createdAt: "2023-07-04 13:05:01",
				},
				{
					userID: 1,
					content: "Test create post 3",
					fileUpload: JSON.stringify([]),
					viewMode: "Only me",
					updatedAt: "2023-07-04 13:05:36",
					createdAt: "2023-07-04 13:05:36",
				},
				{
					userID: 1,
					content: "Test create post 4",
					fileUpload: JSON.stringify(["./public/myFile/1688475987936_24.jpg"]),
					viewMode: "Friend",
					updatedAt: "2023-07-04 13:06:27",
					createdAt: "2023-07-04 13:06:27",
				},
				{
					userID: 1,
					content: "Test create post 5",
					fileUpload: JSON.stringify([
						"./public/myFile/1688476042465_20.jpg",
						"./public/myFile/1688476042466_23.jpg",
					]),
					viewMode: "Everyone",
					updatedAt: "2023-07-04 13:07:22",
					createdAt: "2023-07-04 13:07:22",
				},
				{
					userID: 1,
					content: "Test create post 6",
					fileUpload: JSON.stringify([]),
					viewMode: "Everyone",
					updatedAt: "2023-07-04 13:07:47",
					createdAt: "2023-07-04 13:07:47",
				},
				{
					userID: 3,
					content: "Test create post 7",
					fileUpload: JSON.stringify([]),
					viewMode: "Everyone",
					updatedAt: "2023-07-04 13:08:21",
					createdAt: "2023-07-04 13:08:21",
				},
				{
					userID: 3,
					content: "Test create post 8",
					fileUpload: JSON.stringify([]),
					viewMode: "Friend",
					updatedAt: "2023-07-04 13:08:28",
					createdAt: "2023-07-04 13:08:28",
				},
				{
					userID: 3,
					content: "Test create post 9",
					fileUpload: JSON.stringify([]),
					viewMode: "Friend",
					updatedAt: "2023-07-04 13:08:31",
					createdAt: "2023-07-04 13:08:31",
				},
				{
					userID: 3,
					content: "Test create post 10",
					fileUpload: JSON.stringify([]),
					viewMode: "Only me",
					updatedAt: "2023-07-04 13:08:50",
					createdAt: "2023-07-04 13:08:50",
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Posts", null, {});
	},
};
