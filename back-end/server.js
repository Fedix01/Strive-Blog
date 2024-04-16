import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import { apiRouteAuthors } from "./services/routes/author.route.js";
import cors from "cors";
import { apiRoutePosts } from "./services/routes/blogPost.route.js";
import { logger } from "./services/middlewares/logger.js";
import { authenticate } from "./services/middlewares/authentication.js";
import { badRequestHandler, genericErrorHandler, notFoundHandler, unhatorizedHandler } from "./services/middlewares/errorHandler.js";

// Creo il server
const app = express()
const port = 3001
// Abilito l'utilizzo del .env
config();
// Abilito la comunicazione col json
app.use(express.json());

// Abilito l utilizzo di cors
app.use(cors());
// Aggiungo dei middleware
app.use(logger);
// app.use(authenticate)

//  Importo la route
app.use("/api", apiRouteAuthors);
app.use("/api", apiRoutePosts);
app.get("*", (req, res, next) => {
    const error = new Error;
    error.status = 404;
    error.message = "404 Page Not Found";
    res.send(error)
})
// Inserisco gli errori
app.use(badRequestHandler);
app.use(unhatorizedHandler);
app.use(notFoundHandler);
app.use(genericErrorHandler);

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