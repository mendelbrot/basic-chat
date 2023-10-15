module.exports = {
  dev: {
    username: "postgres",
    database: "postgres",
    host: "127.0.0.1",
    port: 5000,
    dialect: "postgres"
  },
  test: {
    username: "postgres",
    database: "postgres",
    host: "127.0.0.1",
    port: 5001,
    dialect: "postgres",
  },
  // prod: {
  //   username: process.env.DB_USERNAME,
  //   password: process.env.DB_PASSWORD,
  //   database: process.env.DB_NAME,
  //   host: process.env.DB_HOSTNAME,
  //   port: process.env.DB_PORT,
  //   dialect: "postgres",
  //   dialectOptions: {
  //     bigNumberStrings: true,
  //     ssl: { // https://node-postgres.com/features/ssl
  //       ca: fs.readFileSync(__dirname + "/mysql-ca-main.crt"),
  //     },
  //   },
  // },
};
