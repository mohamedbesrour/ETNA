//Modules externes du package.json
const express = require('express');
const db = require("./db");
const bodyParser = require('body-parser');

const PORT = 3000;
const HOST  = "0.0.0.0";

// Variables globales
const app = express();
app.use(express.json());

//Routes get
app.get('/', (req, res) => {
    res.send('Hello World !')
});
app.get('/post', (req, res) => {
    res.json({ message: "Voici les données" });
});

app.get("/create", async (req, res) => {
    try{
        const clients = await db.query("CREATE TABLE clients(id SERIAL PRIMARY KEY, name VARCHAR(100), firstname VARCHAR(100))");
        res.status(200).send({message: "Table créée"});
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(PORT, HOST, () => {
    console.log("Le serveur a démarré au port: " + PORT)
});