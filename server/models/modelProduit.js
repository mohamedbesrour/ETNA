const pool = require("../db");

const createProduit = async (titre, categorie, description, image, prix, stock) => {
    const newProduit = await pool.query(
        "INSERT INTO produits (titre, categorie, description, image, prix, stock) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [titre, categorie, description, image, prix, stock]
    );
    return newProduit.rows[0];
};

const getProduits = async () => { 
    const produit = await pool.query("SELECT * FROM produits");
    return produit.rows;
};

const putProduit = async (id_produit, titre, categorie, description, image, prix, stock) => {
    const updatedProduit = await pool.query(
        "UPDATE produits SET titre = $1, categorie = $2, description = $3, image = $4, prix = $5, stock = $6 WHERE id_produit = $7 RETURNING *",
        [titre, categorie, description, image, prix, stock, id_produit]
    );
    return updatedProduit.rows[0];
};

const deleteProduit = async (id_produit) => {
    await pool.query("DELETE FROM produits WHERE id_produit = $1", [id_produit]);
};

module.exports = { createProduit, getProduits, putProduit, deleteProduit };