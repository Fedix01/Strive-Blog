import { Router } from "express";
import User from "../models/user.model.js";
// Importo il modello dell api

export const apiRoute = Router();

// Chiamata get a tutti gli oggetti dell api
apiRoute.get("/", async (req, res, next) => {
    try {
        let users = await User.find();
        res.send(users)
    } catch (error) {
        next(error)
    }
});

// Chiamata get all esatto parametro passato
apiRoute.get("/:id", async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id);
        res.send(user)

    } catch (error) {
        next(error)
    }
});
// Chiamata post col body

apiRoute.post("/", async (req, res, next) => {
    try {
        let user = await User.create(req.body);
        res.send(user).status(400)
    } catch (error) {
        next(error)
    }
});
// Chiamata put con id e body allegati

apiRoute.put("/:id", async (req, res, next) => {
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

apiRoute.delete("/:id", async (req, res, next) => {
    try {
        await User.deleteOne({
            _id: req.params.id
        });
        res.send("Autore eliminato correttamente").status(204);
    } catch (error) {
        next(error)
    }
})