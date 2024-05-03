import { Router } from "express";
import BlogPost from "../models/blogPost.model.js";
import { coverCloud } from '../middlewares/multer.js';
import { sendEmail } from "../middlewares/sendEmail.js";
import Comments from "../models/comment.model.js";
import User from "../models/user.model.js";
import { authMiddleware } from "../middlewares/authentication.js";
import { checkCommentAuthor } from "../middlewares/commentAuthor.js";

export const apiRoutePosts = Router();


apiRoutePosts.get("/", async (req, res, next) => {
    try {
        let posts;
        const query = req.query.title;

        if (query) {
            posts = await BlogPost.find({ title: { $eq: query } });
        } else {
            posts = await BlogPost.find().populate({
                path: "author",
                model: "User",
                select: ["nome", "cognome", "avatar"],
            });
        }

        res.send(posts);
    } catch (error) {
        next(error);
    }
});

apiRoutePosts.get("/:id", async (req, res, next) => {
    try {
        let singlePost = await BlogPost.findById(req.params.id);
        await singlePost.populate({
            path: "author",
            model: "User",
            select: ["nome", "cognome", "avatar"]
        });
        res.send(singlePost)
    } catch (error) {
        next(error)
    }
});

apiRoutePosts.post("/", authMiddleware, async (req, res, next) => {
    try {
        let authorId = req.user.id;

        let makePost = await BlogPost.create({
            ...req.body,
            author: authorId
        });

        await makePost.populate({
            path: "author",
            model: "User",
            select: ["nome", "cognome", "avatar"],
        });

        res.send(makePost);
    } catch (error) {
        next(error)
    }
});

apiRoutePosts.put("/:id", async (req, res, next) => {
    try {
        let modifyPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.send(modifyPost)
    } catch (error) {
        next(error)
    }
});

apiRoutePosts.delete("/:id", async (req, res, next) => {
    try {
        let deletePost = await BlogPost.deleteOne({
            _id: req.params.id
        });
        res.send("Post eliminato correttamente")
    } catch (error) {
        next(error)
    }
});

apiRoutePosts.patch("/:id/cover", coverCloud.single("cover"), async (req, res, next) => {
    try {
        let updateUser = await BlogPost.findByIdAndUpdate(
            req.params.id,
            { cover: req.file.path },
            { new: true }
        );
        res.send(updateUser)
    }

    catch (error) {
        next(error)
    }

})


apiRoutePosts.get("/:id/comments", async (req, res, next) => {
    try {
        let comments = await Comments.find({
            blog: req.params.id,
        }).populate({
            path: "author",
            model: "User",
            select: ["nome", "cognome", "avatar"],
        })
        res.send(comments)
    } catch (error) {
        next(error)
    }
})


apiRoutePosts.get("/:id/comments/:commentId", async (req, res, next) => {
    try {
        let comments = await Comments.find({
            blog: req.params.id,
            _id: req.params.commentId
        }).populate({
            path: "author",
            model: "User",
            select: ["nome", "cognome", "avatar"],
        })
        res.send(comments)
    } catch (error) {
        next(error)
    }
})



apiRoutePosts.post("/:id", authMiddleware, async (req, res, next) => {
    try {

        let authorId = req.user.id;

        let newComment = await Comments.create({
            ...req.body,
            blog: req.params.id,
            author: authorId
        })
        console.log(newComment)
        let post = await BlogPost.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: newComment,
                },
            },
            { new: true }
        ).populate({
            path: "comments",
            populate: {
                path: "author",
                model: "User",
                select: ["nome", "cognome", "avatar"],
            },
        })
        res.send(post)
    } catch (error) {
        next(error)
    }
})

apiRoutePosts.put("/:id/comments/:commentId", async (req, res, next) => {
    try {
        let comment = await Comments.findOneAndUpdate({
            blog: req.params.id,
            _id: req.params.commentId
        }, req.body, { new: true }).populate({
            path: "author",
            model: "User",
            select: ["nome", "cognome", "avatar"],
        })
        res.send(comment)
    } catch (error) {
        next(error)
    }
})

apiRoutePosts.delete("/:id/comments/:commentId", async (req, res, next) => {
    try {
        const deleteComment = await Comments.findOneAndDelete({
            blog: req.params.id,
            _id: req.params.commentId
        })
        res.send(deleteComment)
    } catch (error) {
        next(error)
    }
})

