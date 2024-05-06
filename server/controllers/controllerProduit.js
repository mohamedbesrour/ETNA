const express = require("express");
const modelProduit = require("../models/modelProduit");
const router = express.Router();

router.post("/produits", async (req, res) => {
    try {
        const { titre, categorie, description, image, prix, stock } = req.body;
        const newProduit = await modelProduit.createProduit(titre, categorie, description, image, prix, stock);
        res.json(newProduit);
    } catch (err) {
        console.error("Erreur lors de la création du nouveau produits", err);
        res.status(500).json({ message: "Erreur JSON lors de la création du nouveau produits"});
    }
});

router.get("/produits", async (req, res) => {
    try {
        const produits = await modelProduit.getProduits();
        res.json(produits);
    } catch (err) {
        console.error("Erreur lors de la récupération des produits", err);
        res.status(500).json({ message: "Erreur JSON lors de la récupération des produits" });
    }
});

router.put("/produits/:id_produit", async (req, res) => {
    try {
        const { id_produit } = req.params;
        const { titre, categorie, description, image, prix, stock } = req.body;
        const updatedProduit = await modelProduit.putProduit(id_produit, titre, categorie, description, image, prix, stock);
        res.json(updatedProduit);
    } catch (err) {
        console.error("Erreur lors de la mise à jour des produits", err);
        res.status(500).json({ message: "Erreur JSON lors de la mise à jour des produits" });
    }
});

router.delete("/produits/:id_produit", async (req, res) => {
    try { 
        const { id_produit } = req.params;
        await modelProduit.deleteProduit(id_produit);
        res.json({ message: "Produit supprimé avec succès"});
    } catch (err) {
        console.error("Erreur lors de la suppression du produit", err);
        res.status(500).json({ message: "Erreur lors de la suppression du produit" });
    }
});

module.exports = router;