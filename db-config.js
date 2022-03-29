// https://node-postgres.com/features/connecting

const { Pool } = require("pg");
const options = {
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "admin",
  database: "postgres"
};


const pool = new Pool(options);

module.exports = pool;
