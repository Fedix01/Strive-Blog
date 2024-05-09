import { Router } from "express";
import User from "../models/user.model.js";
import { avatarCloud } from '../middlewares/multer.js';
import { sendEmail } from "../middlewares/sendEmail.js";
import bcrypt from "bcryptjs";
import { authMiddleware, generateJWT } from "../middlewares/authentication.js";
import passport from "passport";
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


// Chiamata get col profilo loggato
apiRouteAuthors.get("/me", authMiddleware, async (req, res, next) => {
    try {
        let user = await User.findById(req.user.id);
        res.send(user)
    } catch (error) {
        next(error)
    }
});
apiRouteAuthors.get("/googleLogin",
    passport.authenticate("google",
        { scope: ["profile", "email"] }));

apiRouteAuthors.get(
    "/callback",
    passport.authenticate("google", { session: false }),
    (req, res, next) => {
        try {
            res.redirect(`http://localhost:3000/?accessToken=${req.user.accToken}&name=${req.user.given_name}&surname=${req.user.family_name}&avatar=${req.user.picture}`);
        } catch (error) {
            console.log(error)
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

        const token = await generateJWT({
            _id: user._id
        });

        sendEmail(req.body.email, `<h1>Ciao ${req.body.nome}, benvenuto nel sito</h1>`);

        res.send({ user, token })
    } catch (error) {
        next(error)
    }
});

// Chiamata post con comparazione di password per il login 

apiRouteAuthors.post("/login", async (req, res, next) => {

    try {
        let userFound = await User.findOne({
            email: req.body.email
        }).select('+password');
        if (userFound) {
            const matching = await bcrypt.compare(
                req.body.password,
                userFound.password)

            if (matching) {
                const token = await generateJWT({
                    _id: userFound._id
                });
                res.send({ user: userFound, token })
            } else {
                res.status(400).send("password sbagliata")
            }
        } else {
            res.send("utente non trovato")
        }


    } catch (error) {
        next(error)
    }

})
// Chiamata put con id e body allegati

apiRouteAuthors.put("/:id", async (req, res, next) => {
    try {
        let user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });

        const token = await generateJWT({
            _id: user._id
        });

        res.send({ user, token })
    } catch (error) {
        next(error)
    }
});

// Chiamata delete con id

apiRouteAuthors.delete("/:id", async (req, res, next) => {
    try {
        const deleted = await User.deleteOne({
            _id: req.params.id
        });
        res.send(deleted);
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

        const token = await generateJWT({
            _id: updateUser._id
        });


        res.send({ user: updateUser, token });
    }

    catch (error) {
        next(error)
    }

})