'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', [{
        postID: 7,
        content: "Comment 1",
        userID: 1,
        updatedAt: "2023-10-30 13:59:17",
        createdAt: "2023-10-30 13:59:17"
    },
    {
      postID: 7,
      content: "Comment 2",
      userID: 1,
      updatedAt: "2023-10-30 13:59:17",
      createdAt: "2023-10-30 13:59:17"
  }, {
    postID: 7,
    content: "Comment 3",
    userID: 3,
    updatedAt: "2023-10-30 14:00:17",
    createdAt: "2023-10-30 14:00:17"
},{
  postID: 7,
  content: "Comment 4",
  userID: 2,
  updatedAt: "2023-10-30 14:01:17",
  createdAt: "2023-10-30 14:01:17"
},{
  postID: 7,
  content: "Comment 5",
  userID: 6,
  updatedAt: "2023-10-30 14:05:17",
  createdAt: "2023-10-30 14:05:17"
},{
  postID: 7,
  content: "Comment 6",
  userID: 6,
  updatedAt: "2023-10-30 14:11:00",
  createdAt: "2023-10-30 14:11:00"
},{
  postID: 7,
  content: "Comment 7",
  userID: 1,
  updatedAt: "2023-10-30 14:14:00",
  createdAt: "2023-10-30 14:14:00"
},
  ], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
