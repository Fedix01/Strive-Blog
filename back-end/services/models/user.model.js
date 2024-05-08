import { Schema, model } from "mongoose";
// Creazione dello schema dell api
const userSchema = new Schema(
    {
        nome: {
            type: String,
            required: true
        },

        cognome: {
            type: String,
            required: true
        },

        username: {
            type: String,
            unique: true,
            required: true
        },

        email: {
            type: String,
            unique: true,
            required: true
        },

        dataDiNascita: {
            type: String,
            required: false
        },

        avatar: {
            type: String,
            required: false
        },

        password: {
            type: String,
            select: false,
            required: true
        },

        googleId: {
            type: String,
            required: false
        }

    },
    {
        collection: "authors",
        timestamps: true,
    }
);
// Esporto il modello
export default model("User", userSchema);