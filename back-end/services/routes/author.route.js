import { Router } from "express";
import User from "../models/user.model.js";
import cloudinaryMiddleware from '../middlewares/multer.js'
// Importo il modello dell api

export const apiRouteAuthors = Router();

// Chiamata get a tutti gli oggetti dell api
apiRouteAuthors.get("/", async (req, res, next) => {
    try {
        let users = await User.find();
        res.send(users)
    } catch (error) {
        next(error)
    }
});

// Chiamata get all esatto parametro passato
apiRouteAuthors.get("/:id", async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id);
        res.send(user)

    } catch (error) {
        next(error)
    }
});
// Chiamata post col body

apiRouteAuthors.post("/", async (req, res, next) => {
    try {
        let user = await User.create(req.body);
        res.send(user).status(400)
    } catch (error) {
        next(error)
    }
});
// Chiamata put con id e body allegati

apiRouteAuthors.put("/:id", async (req, res, next) => {
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

apiRouteAuthors.delete("/:id", async (req, res, next) => {
    try {
        await User.deleteOne({
            _id: req.params.id
        });
        res.send("Autore eliminato correttamente").status(204);
    } catch (error) {
        next(error)
    }
});

apiRouteAuthors.patch("/:id/avatar", cloudinaryMiddleware.single("avatar"), async (req, res, next) => {
    try {
        let updateUser = await User.findByIdAndUpdate(
            req.params.id,
            { avatar: req.file.path },
            { new: true }
        );
        res.send(updateUser)
    }

    catch (error) {
        next(error)
    }

})