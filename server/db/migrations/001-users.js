"use strict";
const { QueryTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        created_at TIMESTAMPTZ NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL
      );`,
      {
        type: QueryTypes.CREATE,
      }
    );

    await queryInterface.sequelize.query(
      `CREATE INDEX idx_username ON users (username);`,
      {
        type: QueryTypes.CREATE,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`DROP TABLE users;`),
      {
        type: QueryTypes.DROP,
      };
  },
};
