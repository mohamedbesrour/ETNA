const carsController = require("../controller/crud-voiture");
const { Router } = require("express");

const router = Router();

// Routes pour les voitures
router.post("/voiture", carsController.postVoiture);
router.get("/voiture", carsController.getVoiture);
router.get("/voiture/:id", carsController.getIdVoiture);
router.put("/voiture/:id", carsController.putVoiture);
router.delete("/voiture/:id", carsController.deleteVoiture);

// Routes pour la galerie
router.post("/voiture/galerie", carsController.postGalerieImage);
router.get("/voiture/galerie/:id", carsController.getGalerieByVoitureId);
router.put("/voiture/galerie/:id", carsController.updateGalerieImage);
router.delete("/voiture/galerie/:id", carsController.deleteGalerieImage);

module.exports = router;
