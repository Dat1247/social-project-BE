'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Likes', [
      {
        postID: "4",
        userID: "1",
        createdAt: "2023-10-26 12:59:17",
        updatedAt: "2023-10-26 12:59:17",
      },
      {
        postID: "6",
        userID: "1",
        createdAt: "2023-10-26 12:59:17",
        updatedAt: "2023-10-26 12:59:17",
      },
      {
        postID: "5",
        userID: "1",
        createdAt: "2023-10-26 12:59:17",
        updatedAt: "2023-10-26 12:59:17",
      },
      {
        postID: "5",
        userID: "2",
        createdAt: "2023-10-26 12:59:17",
        updatedAt: "2023-10-26 12:59:17",
      },
      {
        postID: "6",
        userID: "2",
        createdAt: "2023-10-26 12:59:17",
        updatedAt: "2023-10-26 12:59:17",
      },
      {
        postID: "7",
        userID: "2",
        createdAt: "2023-10-26 12:59:17",
        updatedAt: "2023-10-26 12:59:17",
      },
      {
        postID: "5",
        userID: "4",
        createdAt: "2023-10-26 12:59:17",
        updatedAt: "2023-10-26 12:59:17",
      },
      {
        postID: "7",
        userID: "4",
        createdAt: "2023-10-26 12:59:17",
        updatedAt: "2023-10-26 12:59:17",
      },

      {
        postID: "5",
        userID: "6",
        createdAt: "2023-10-26 12:59:17",
        updatedAt: "2023-10-26 12:59:17",
      },
      {
        postID: "5",
        userID: "3",
        createdAt: "2023-10-26 12:59:17",
        updatedAt: "2023-10-26 12:59:17",
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Likes', null, {});
  }
};
