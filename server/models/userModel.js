const pool = require("../db");

const createUser = async (username, email, password, role) => {
  const newUser = await pool.query(
    "INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
    [username, email, password, role]
  );
  return newUser.rows[0];
};

const getUsers = async () => {
  const users = await pool.query("SELECT * FROM users");
  return users.rows;
};

const updateUser = async (userId, username, email, password, role) => {
  const updatedUser = await pool.query(
    "UPDATE users SET username = $1, email = $2, password = $3, role = $4 WHERE user_id = $5 RETURNING *",
    [username, email, password, role, userId]
  );
  return updatedUser.rows[0];
};

const deleteUser = async (userId) => {
  await pool.query("DELETE FROM users WHERE user_id = $1", [userId]);
};

module.exports = {createUser, getUsers, updateUser, deleteUser};
