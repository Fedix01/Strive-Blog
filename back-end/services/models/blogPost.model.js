import { Schema, model } from "mongoose";

const blogPostModel = new Schema(
    {
        category: {
            type: String,
            require: true
        },

        title: {
            type: String,
            require: true
        },

        cover: {
            type: String,
            require: true
        },

        readTime: {
            value: {
                type: Number,
                require: true
            },
            unit: {
                type: String,
                require: true
            }
        },

        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

        content: {
            type: String,
            require: true
        },

        comments: [{
            "text": String,
            "author": {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        }]
    },

    {
        collection: "BlogPost"
    }
);

export default model("BlogPost", blogPostModel)