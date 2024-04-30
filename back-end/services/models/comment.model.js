import { Schema, model } from "mongoose";

const commentsSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        blog: {
            type: Schema.Types.ObjectId,
            ref: "BlogPost",
        }
    },
    {
        collection: "comments",
        timestamps: true,
    }

)

export default model("Comments", commentsSchema)