import { Router } from "express";
import BlogPost from "../models/blogPost.model.js";
import cloudinaryMiddleware from '../middlewares/multer.js';
export const apiRoutePosts = Router();


apiRoutePosts.get("/blogPosts", async (req, res, next) => {
    try {
        let posts;
        const query = req.query.title;

        if (query) {
            posts = await BlogPost.find({ title: { $eq: query } });
        } else {
            posts = await BlogPost.find();
        }

        res.send(posts);
    } catch (error) {
        next(error);
    }
});

apiRoutePosts.get("/blogPosts/:id", async (req, res, next) => {
    try {
        let singlePost = await BlogPost.findById(req.params.id);
        res.send(singlePost)
    } catch (error) {
        next(error)
    }
});

apiRoutePosts.post("/blogPosts", async (req, res, next) => {
    try {
        let makePost = await BlogPost.create(req.body);
        res.send(makePost)
    } catch (error) {
        next(error)
    }
});

apiRoutePosts.put("/blogPosts/:id", async (req, res, next) => {
    try {
        let modifyPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.send(modifyPost)
    } catch (error) {
        next(error)
    }
});

apiRoutePosts.delete("/blogPosts/:id", async (req, res, next) => {
    try {
        let deletePost = await BlogPost.deleteOne({
            _id: req.params.id
        });
        res.send("Post eliminato correttamente")
    } catch (error) {
        next(error)
    }
});

apiRoutePosts.patch("/:id/avatar", cloudinaryMiddleware, async (req, res, next) => {
    try {
        let updateUser = await BlogPost.findByIdAndUpdate(
            req.params.id,
            { avatar: req.file.path },
            { new: true }
        );
        res.send(updateUser)
    }

    catch (error) {
        next(error)
    }

})

