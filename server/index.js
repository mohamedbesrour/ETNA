const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./db");
const userController = require("./controllers/userController");
const produitController = require("./controllers/produitController");
const utilisateurController = require("./controllers/utilisateurController");

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/", userController);
app.use("/", produitController);
app.use("/", utilisateurController);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
app.listen(PORT, HOST, () => {
  console.log("Le serveur a démarré au port: " + PORT);
});