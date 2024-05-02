const { Pool } = require("pg");

const pool = new Pool({
    host: "postgres",
    port: 5432,
    user: "user",
    password: "root",
    database: "demodb"
});

module.exports = pool