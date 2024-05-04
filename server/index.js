//Modules externes du package.json
const express = require("express");
const pool = require("./db");
const bodyParser = require("body-parser");

const PORT = 3000;
const HOST = "0.0.0.0";

// Variables globales
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Create users
app.post("/users", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [username, email, password, role]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error("Erreur lors de la création de l'utilisateur", err);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'utilisateur" });
  }
});

// Read users
app.get("/users", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    res.json(users.rows);
  } catch (err) {
    console.error("Erreur lors de la récupération des utilisateurs", err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
});

// Update users
app.put("/users/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const { username, email, password, role } = req.body;
    const updatedUser = await pool.query(
      "UPDATE users SET username = $1, email = $2, password = $3, role = $4 WHERE user_id = $5 RETURNING *",
      [username, email, password, role, user_id]
    );
    res.json(updatedUser.rows[0]);
  } catch (err) {
    console.error("Erreur lors de la mise à jour de l'utilisateur", err);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
  }
});

// Delete users id
app.delete("/users/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    await pool.query("DELETE FROM users WHERE user_id = $1", [user_id]);
    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (err) {
    console.error("Erreur lors de la suppression de l'utilisateur", err);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de l'utilisateur" });
  }
});

app.listen(PORT, HOST, () => {
  console.log("Le serveur a démarré au port: " + PORT);
});
