import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import { apiRoute } from "./services/routes/api.route.js";
import cors from "cors";

// Creo il server
const app = express()
const port = 3001
// Abilito l'utilizzo del .env
config();
// Abilito la comunicazione col json
app.use(express.json());

// Abilito l utilizzo di cors
app.use(cors())

//  Importo la route
app.use("/", apiRoute);

// Funzione per inizializzare il server
const initServer = async () => {
    try {
        // Aspetto che si connetta al mio database
        await mongoose.connect(process.env.DBURL);
        console.log("Connesso al database!")
        // Abilito il server in locale
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })

    } catch (error) {
        console.error(error)
    }
}
// Invoco la funzione
initServer();