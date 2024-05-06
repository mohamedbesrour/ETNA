const express = require("express");
const userModel = require("../models/userModel");
const router = express.Router();

router.post("/users", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const newUser = await userModel.createUser(username, email, password, role);
    res.json(newUser);
  } catch (err) {
    console.error("Erreur lors de la création de l'utilisateur", err);
    res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await userModel.getUsers();
    res.json(users);
  } catch (err) {
    console.error("Erreur lors de la récupération des utilisateurs", err);
    res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
});

router.put("/users/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const { username, email, password, role } = req.body;
    const updatedUser = await userModel.updateUser(user_id, username, email, password, role);
    res.json(updatedUser);
  } catch (err) {
    console.error("Erreur lors de la mise à jour de l'utilisateur", err);
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
  }
});

router.delete("/users/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    await userModel.deleteUser(user_id);
    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (err) {
    console.error("Erreur lors de la suppression de l'utilisateur", err);
    res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" });
  }
});

module.exports = router;