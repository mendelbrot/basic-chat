module.exports = {
  dev: {
    username: "postgres",
    // password: "postgres",
    database: "postgres",
    host: "127.0.0.1",
    port: 5000,
    dialect: "postgres"
  },
  test: {
    username: "postgres",
    // password: "postgres",
    database: "postgres",
    host: "127.0.0.1",
    port: 5001,
    dialect: "postgres",
  },
  prod: {
    username: "postgres",
    password: "postgres",
    database: "postgres",
    host: "127.0.0.1",
    port: 5000,
    dialect: "postgres",
    // username: process.env.PROD_DB_USERNAME,
    // password: process.env.PROD_DB_PASSWORD,
    // database: process.env.PROD_DB_NAME,
    // host: process.env.PROD_DB_HOSTNAME,
    // port: process.env.PROD_DB_PORT,
    // dialect: "postgres",
    // dialectOptions: {
    //   bigNumberStrings: true,
    //   ssl: { // https://node-postgres.com/features/ssl
    //     ca: fs.readFileSync(__dirname + "/mysql-ca-main.crt"),
    //   },
    // },
  },
};
