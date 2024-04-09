import { Router } from "express";
import User from "../models/user.model.js";


export const apiRoute = Router();

apiRoute.get("/", async (req, res) => {
    res.send("Sei al route principale dell api")
})