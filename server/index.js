const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./db");
const userController = require("./controllers/userController");
const produitController = require("./controllers/produitController");
const utilisateurController = require("./controllers/utilisateurController");

const app = express();
const PORT = 3000;
const HOST = "0.0.0.0";

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", userController);
app.use("/", produitController);
app.use("/", utilisateurController);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, HOST, () => {
  console.log("Le serveur a démarré au port: " + PORT);
});