"use strict";
const { QueryTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `CREATE TABLE messages (
        id SERIAL PRIMARY KEY,
        content TEXT,
        user_id INT REFERENCES users(id),
        created_at TIMESTAMPTZ NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL
      );`,
      {
        type: QueryTypes.CREATE,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`DROP TABLE messages;`),
      {
        type: QueryTypes.DROP,
      };
  },
};
