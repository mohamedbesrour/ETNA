const { Pool } = require("pg"); // pg pour interagir avec la BDD
require("dotenv").config();

const pool = new Pool({
    user: process.env.DB_USER || "admin",
    password: process.env.DB_PASSWORD || "root",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || "garage"
});

module.exports = pool;