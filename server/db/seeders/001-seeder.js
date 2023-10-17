"use strict";
const { QueryTypes } = require("sequelize");
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hash = await bcrypt.hash("password", 10);

    const result1 = await queryInterface.sequelize.query(
      `INSERT INTO users (username, password, active_at, created_at, updated_at)
      VALUES ('user1', :password, NOW(), NOW(), NOW())
      RETURNING id;`,
      {
        replacements: { password: hash },
        type: QueryTypes.INSERT,
      }
    );

    const user1 = result1[0][0].id;

    const result2 = await queryInterface.sequelize.query(
      `INSERT INTO users (username, password, active_at, created_at, updated_at)
      VALUES ('user2', :password, NOW(), NOW(), NOW())
      RETURNING id;`,
      {
        replacements: { password: hash },
        type: QueryTypes.INSERT,
      }
    );

    const user2 = result2[0][0].id;

    await queryInterface.sequelize.query(
      `INSERT INTO messages (content, user_id, created_at, updated_at)
      VALUES ('hello', :user1, NOW(), NOW());`,
      {
        replacements: { user1: user1 },
        type: QueryTypes.SELECT,
      }
    );

    await queryInterface.sequelize.query(
      `INSERT INTO messages (content, user_id, created_at, updated_at)
      VALUES ('hi!', :user2, NOW(), NOW());`,
      {
        replacements: { user2: user2 },
        type: QueryTypes.SELECT,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`DELETE FROM messages`, {
      type: QueryTypes.DELETE,
    });

    await queryInterface.sequelize.query(`DELETE FROM users`, {
      type: QueryTypes.DELETE,
    });
  },
};
