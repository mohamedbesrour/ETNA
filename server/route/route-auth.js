const express = require("express");
const { postInscription, postConnexion } = require("../controller/crud-auth");

const router = express.Router();

router.post("/signup", postInscription);
router.post("/login", postConnexion);

module.exports = router;