import { Router } from "express";
import BlogPost from "../models/blogPost.model.js";

export const apiRoutePosts = Router();

apiRoutePosts.get("/blogPost", async (req, res, next) => {
    try {
        let allPosts = await BlogPost.find();
        res.send(allPosts)
    } catch (error) {
        next(error)
    }
});

apiRoutePosts.get("/blogPost/:id", async (req, res, next) => {
    try {
        let singlePost = await BlogPost.findById(req.params.id);
        res.send(singlePost)
    } catch (error) {
        next(error)
    }
});

apiRoutePosts.post("/blogPost", async (req, res, next) => {
    try {
        let makePost = await BlogPost.create(req.body);
        res.send(makePost)
    } catch (error) {
        next(error)
    }
});

apiRoutePosts.put("/blogPost/:id", async (req, res, next) => {
    try {
        let modifyPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.send(modifyPost)
    } catch (error) {
        next(error)
    }
});

apiRoutePosts.delete("/blogPost/:id", async (req, res, next) => {
    try {
        let deletePost = await BlogPost.deleteOne({
            _id: req.params.id
        });
        res.send("Post eliminato correttamente")
    } catch (error) {
        next(error)
    }
})

