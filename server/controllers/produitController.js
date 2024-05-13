const express = require("express");
const produitModel = require("../models/produitModel");
const router = express.Router();

router.post("/produits", async (req, res) => {
    try {
        const { titre, categorie, description, image, prix, stock } = req.body;
        const newProduit = await produitModel.createProduit(titre, categorie, description, image, prix, stock);
        res.json(newProduit);
    } catch (err) {
        console.error("Erreur lors de la création du nouveau produits", err);
        res.status(500).json({ message: "Erreur JSON lors de la création du nouveau produits"});
    }
});

router.get("/produits", async (req, res) => {
    try {
        const produits = await produitModel.getProduits();
        res.json(produits);
    } catch (err) {
        console.error("Erreur lors de la récupération des produits", err);
        res.status(500).json({ message: "Erreur JSON lors de la récupération des produits" });
    }
});

router.get("/produits/:id_produit", async (req, res) => {
    try {
        const { id_produit } = req.params;
        const produit = await produitModel.getProduitId(id_produit);
        if (!produit) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }
        res.json(produit);
    } catch (err) {
        console.error("Erreur lors de la récupération du produit", err);
        res.status(500).json({ message: "Erreur JSON lors de la récupération du produit"});
    }
});

router.put("/produits/:id_produit", async (req, res) => {
    try {
        const { id_produit } = req.params;
        const { titre, categorie, description, image, prix, stock } = req.body;
        const updatedProduit = await produitModel.putProduit(id_produit, titre, categorie, description, image, prix, stock);
        res.json(updatedProduit);
    } catch (err) {
        console.error("Erreur lors de la mise à jour des produits", err);
        res.status(500).json({ message: "Erreur JSON lors de la mise à jour des produits" });
    }
});

router.delete("/produits/:id_produit", async (req, res) => {
    try { 
        const { id_produit } = req.params;
        await produitModel.deleteProduit(id_produit);
        res.json({ message: "Produit supprimé avec succès"});
    } catch (err) {
        console.error("Erreur lors de la suppression du produit", err);
        res.status(500).json({ message: "Erreur lors de la suppression du produit" });
    }
});

module.exports = router;