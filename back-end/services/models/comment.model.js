import { Schema, model } from "mongoose";

const commentsSchema = new Schema(
    {
        comment: {
            type: String,
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        blog: {
            type: Schema.Types.ObjectId,
            ref: "BlogPost"
        }
    },
    {
        collection: "comments"
    }
)

export default model("Comments", commentsSchema)