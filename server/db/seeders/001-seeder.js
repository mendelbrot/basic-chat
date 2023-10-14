'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `INSERT INTO users (username, password, created_at, updated_at)
      VALUES ('user1', 'password', NOW(), NOW());`
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `DELETE FROM users
      WHERE username = 'user1';
      `
    );
  }
};
