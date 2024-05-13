const pool = require("../db");

const createUtilisateur = async (nom, prenom, email, password, role) => {
    const newUtilisateur = await pool.query(
        "INSERT INTO utilisateurs (nom, prenom, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [nom, prenom, email, password, role]
    );
    return newUtilisateur.rows[0];
};

const getUtilisateurs = async () => { 
    const utilisateurs = await pool.query("SELECT * FROM utilisateurs;");
    return utilisateurs.rows;
};

const getUtilisateurId = async (id_utilisateur) => {
    const utilisateur = await pool.query(
        "SELECT * FROM utilisateurs WHERE id_utilisateur = $1",
        [id_utilisateur]
    );
    return utilisateur.rows[0];
};

const putUtilisateur = async (id_utilisateur, nom, prenom, email, password, role) => {
    const updatedUtilisateur = await pool.query(
        "UPDATE utilisateurs SET nom = $1, prenom = $2, email = $3, password = $4, role = $5 WHERE id_utilisateur = $6 RETURNING *",
        [nom, prenom, email, password, role, id_utilisateur]
    );
    return updatedUtilisateur.rows[0];
};

const deleteUtilisateur = async (id_utilisateur) => {
    await pool.query("DELETE FROM utilisateurs WHERE id_utilisateur = $1", [id_utilisateur]);
};

module.exports = { createUtilisateur, getUtilisateurs, getUtilisateurId, putUtilisateur, deleteUtilisateur };