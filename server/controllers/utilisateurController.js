const express = require("express");
const utilisateurModel = require("../models/utilisateurModel");
const router = express.Router();

router.post("/utilisateurs", async (req, res) => {
    try {
        const { nom, prenom, email, password, role } = req.body;
        const newUtilisateur = await utilisateurModel.createUtilisateur(nom, prenom, email, password, role);
        res.json(newUtilisateur);
    } catch (err) {
        console.error("Erreur lors de la création du nouveau utilisateurs", err);
        res.status(500).json({ message: "Erreur JSON lors de la création du nouveau utilisateur"});
    }
});

router.get("/utilisateurs", async (req, res) => {
    try {
        const utilisateurs = await utilisateurModel.getUtilisateurs();
        res.json(utilisateurs);
    } catch (err) {
        console.error("Erreur lors de la récupération des utilisateurs", err);
        res.status(500).json({ message: "Erreur JSON lors de la récupération des utilisateurs" });
    }
});

router.get("/utilisateurs/:id_utilisateur", async (req, res) => {
    try {
        const { id_utilisateur } = req.params;
        const utilisateur = await utilisateurModel.getUtilisateurId(id_utilisateur);
        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.json(utilisateur);
    } catch (err) {
        console.error("Erreur lors de la récupération de l'utilisateur", err);
        res.status(500).json({ message: "Erreur JSON lors de la récupération de l'utilisateur" });
    }
});

router.put("/utilisateurs/:id_utilisateur", async (req, res) => {
    try {
        const { id_utilisateur } = req.params;
        const { nom, prenom, email, password, role } = req.body;
        const updatedUtilisateur = await utilisateurModel.putUtilisateur(id_utilisateur, nom, prenom, email, password, role);
        res.json(updatedUtilisateur);
    } catch (err) {
        console.error("Erreur lors de la mise à jour de l'utilisateur", err);
        res.status(500).json({ message: "Erreur JSON lors de la mise à jour de l'utilisateur" });
    }
});

router.delete("/utilisateurs/:id_utilisateur", async (req, res) => {
    try { 
        const { id_utilisateur } = req.params;
        await utilisateurModel.deleteUtilisateur(id_utilisateur);
        res.json({ message: "Utilisateur supprimé avec succès"});
    } catch (err) {
        console.error("Erreur lors de la suppression de l'utilisateur", err);
        res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" });
    }
});

module.exports = router;