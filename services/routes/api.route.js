import { Router } from "express";
import User from "../models/user.model.js";


export const apiRoute = Router();

apiRoute.get("/", async (req, res) => {
    res.send("Sei al route principale dell api")
})

apiRoute.post("/", async (req, res, next) => {
    try {
        let user = await User.create(req.body);
        res.send(user).status(201)
    } catch (error) {
        next(error)
    }
})