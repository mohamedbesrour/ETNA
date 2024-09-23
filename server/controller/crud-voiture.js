const pool = require("../db");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

// -------------------------------- //
// --------CRUD - VOITURE---------- //
//--------------------------------- //

const postVoiture = async (req, res) => {
    try {
      const { modele, annee, kilometrage, prix, img } = req.body;
  
      const newVoiture = await pool.query(
        "INSERT INTO voiture (modele, annee, kilometrage, prix, img) VALUES($1, $2, $3, $4, $5) RETURNING *", //insérer INTO nomDeTable (nomDeColone)
        [modele, annee, kilometrage, prix, img]
      );
  
      res.json(newVoiture.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  };
  
  //get all todos  --selectionne toute les voitures
  const getVoiture = async (req, res) => {
    try {
      const allVoiture = await pool.query("SELECT * FROM voiture");
      res.json(allVoiture.rows);
    } catch (err) {
      console.error(err.message);
    }
  };
  
  //oneVoiture == todo   --voiture en particulier
  const getIdVoiture = async (req, res) => {
    try {
      const { id } = req.params;
      const oneVoiture = await pool.query(
        "SELECT * FROM voiture WHERE voiture_id = $1",
        [id]
      );
  
      res.json(oneVoiture.rows[0]);
    } catch (error) {
      console.error(err.message);
    }
  };
  
  //updateVoiture = updateTodo
  const putVoiture = async (req, res) => {
    try {
      const { id } = req.params;
      const { modele, annee, kilometrage, prix, img } = req.body;
  
      const updateVoiture = await pool.query(
        "UPDATE voiture SET modele = $1, annee = $2, kilometrage = $3, prix = $4, img = $5 WHERE voiture_id = $6",
        [modele, annee, kilometrage, prix, img, id]
      );
  
      res.json("Voiture mis à jour");
    } catch (err) {
      console.error(err.message);
    }
  };
  
  //deleteTodo = deleteVoiture
  const deleteVoiture = async (req, res) => {
    try {
      const { id } = req.params;
      const deleteVoiture = await pool.query(
        "DELETE FROM voiture WHERE voiture_id = $1",
        [id]
      );
      res.json("Voiture supprimé !");
    } catch (err) {
      console.log(err.message);
    }
  };


// GET toutes les images d'une voiture spécifique
const getGalerieByVoitureId = async (req, res) => {
  try {
      const { id } = req.params;
      const images = await pool.query(
          "SELECT * FROM galerie WHERE voiture_id = $1",
          [id]
      );
      res.json(images.rows);
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Erreur du serveur");
  }
};
const postGalerieImage = async (req, res) => {
  try {
      const { voiture_id, img_url } = req.body;

      // Vérifier si la voiture existe
      const voiture = await pool.query(
          "SELECT * FROM voiture WHERE voiture_id = $1",
          [voiture_id]
      );

      if (voiture.rows.length === 0) {
          return res.status(404).json({ message: "Voiture non trouvée" });
      }

      // Limiter à 3 images par voiture (optionnel)
      const countImages = await pool.query(
          "SELECT COUNT(*) FROM galerie WHERE voiture_id = $1",
          [voiture_id]
      );

      if (parseInt(countImages.rows[0].count) >= 3) {
          return res.status(400).json({ message: "Limite de 3 images atteinte pour cette voiture" });
      }

      const newImage = await pool.query(
          "INSERT INTO galerie (voiture_id, img_url) VALUES($1, $2) RETURNING *",
          [voiture_id, img_url]
      );

      res.json(newImage.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Erreur du serveur");
  }
};

/**
* PUT modifier une image dans la galerie
*/
const updateGalerieImage = async (req, res) => {
  try {
      const { id } = req.params;
      const { img_url } = req.body;

      const updatedImage = await pool.query(
          "UPDATE galerie SET img_url = $1 WHERE galerie_id = $2 RETURNING *",
          [img_url, id]
      );

      if (updatedImage.rows.length === 0) {
          return res.status(404).json({ message: "Image non trouvée" });
      }

      res.json(updatedImage.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Erreur du serveur");
  }
};

/**
* DELETE une image de la galerie
*/
const deleteGalerieImage = async (req, res) => {
  try {
      const { id } = req.params;

      const deletedImage = await pool.query(
          "DELETE FROM galerie WHERE galerie_id = $1 RETURNING *",
          [id]
      );

      if (deletedImage.rows.length === 0) {
          return res.status(404).json({ message: "Image non trouvée" });
      }

      res.json({ message: "Image supprimée avec succès" });
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Erreur du serveur");
  }
};

module.exports = { 
  postVoiture, 
  getVoiture, 
  getIdVoiture, 
  putVoiture, 
  deleteVoiture,
  getGalerieByVoitureId,
  postGalerieImage,
  updateGalerieImage,
  deleteGalerieImage
};