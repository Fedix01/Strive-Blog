import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import { apiRoute } from "./services/routes/api.route.js";

const app = express()
const port = 3001

config();
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use("/api", apiRoute);

const initServer = async () => {
    try {
        await mongoose.connect(process.env.DBURL);
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })

    } catch (error) {
        console.error(error)
    }
}

initServer();