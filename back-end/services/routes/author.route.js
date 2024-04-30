import { Router } from "express";
import User from "../models/user.model.js";
import { avatarCloud } from '../middlewares/multer.js';
import { sendEmail } from "../middlewares/sendEmail.js";
import bcrypt from "bcryptjs";
import { authMiddleware, generateJWT } from "../middlewares/authentication.js";
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
// Chiamata post col body e password con bcrypt (Registrazione)

apiRouteAuthors.post("/", async (req, res, next) => {

    try {
        let user = await User.create({
            ...req.body,
            password: await bcrypt.hash(req.body.password, 10)
        });
        sendEmail(req.body.email, `<h1>Ciao ${req.body.nome}, benvenuto nel sito</h1>`);
        res.send(user)
    } catch (error) {
        next(err)
    }
});

// Chiamata post con comparazione di password per il login 

apiRouteAuthors.post("/login", async (req, res, next) => {

    try {
        let userFound = await User.findOne({
            email: req.body.email
        });
        if (userFound) {
            const matching = await bcrypt.compare(
                req.body.password,
                userFound.password)

            if (matching) {
                const token = await generateJWT({
                    nome: userFound.nome
                });
                res.send({ user: userFound, token })
            } else {
                res.status(400).send("password sbagliata")
            }
        } else {
            res.send("utente non trovato")
        }


    } catch (error) {
        nexy(error)
    }

})
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

apiRouteAuthors.patch("/:id/avatar", avatarCloud.single("avatar"), async (req, res, next) => {
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