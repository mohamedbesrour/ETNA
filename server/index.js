//Modules externes du package.json
const express = require('express');
const pool = require('./db');
const bodyParser = require('body-parser');

const PORT = 3000;
const HOST  = "0.0.0.0";

// Variables globales
const app = express();
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello World!");
})

//Routes get
app.get('/', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM velo')
        res.status(200).send(data.rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});

app.post('/', async (req, res) => {
    const { name, location } = req.body
    try {
        await db.query('INSERT INTO velo (name, address) VALUES ($1, $2)', [name, location])
        res.status(200).send({ message: "Voici les données" })
    } catch (err){
        console.log(err)
        res.sendStatus(500)
    }
});

app.get("/setup", async (req, res) => {
    try{
        await pool.query('CREATE TABLE velo (id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))')
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.listen(PORT, HOST, () => {
    console.log("Le serveur a démarré au port: " + PORT)
});