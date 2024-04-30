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

        email: {
            type: String,
            required: true
        },

        dataDiNascita: {
            type: String,
            required: true
        },

        avatar: {
            type: String,
            required: false
        },

        password: {
            type: String,
            required: true
        }
    },
    {
        collection: "authors",
        timestamps: true,
    }
);
// Esporto il modello
export default model("User", userSchema);