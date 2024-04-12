import { Router } from "express";
import User from "../models/user.model.js";
// Importo il modello dell api

export const apiRouteAuthors = Router();

// Chiamata get a tutti gli oggetti dell api
apiRouteAuthors.get("/authors", async (req, res, next) => {
    try {
        let users = await User.find();
        res.send(users)
    } catch (error) {
        next(error)
    }
});

// Chiamata get all esatto parametro passato
apiRouteAuthors.get("/authors/:id", async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id);
        res.send(user)

    } catch (error) {
        next(error)
    }
});
// Chiamata post col body

apiRouteAuthors.post("/authors", async (req, res, next) => {
    try {
        let user = await User.create(req.body);
        res.send(user).status(400)
    } catch (error) {
        next(error)
    }
});
// Chiamata put con id e body allegati

apiRouteAuthors.put("/authors/:id", async (req, res, next) => {
    try {
        let user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.send(user)
    } catch (error) {
        next(error)
    }
});

// Chiamata delete con id

apiRouteAuthors.delete("/authors/:id", async (req, res, next) => {
    try {
        await User.deleteOne({
            _id: req.params.id
        });
        res.send("Autore eliminato correttamente").status(204);
    } catch (error) {
        next(error)
    }
})