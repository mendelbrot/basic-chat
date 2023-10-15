import { Sequelize } from "sequelize";

const db = new Sequelize(
  {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    port: Number(process.env.DB_PORT),
    dialect: "postgres",
  }
);

export default db;
