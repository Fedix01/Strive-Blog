import { Schema, model } from "mongoose";
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
            type: Date,
            required: true
        },

        avatar: {
            type: String,
            required: true
        }
    },
    {
        collection: "authors"
    }
);

export default model("User", userSchema);