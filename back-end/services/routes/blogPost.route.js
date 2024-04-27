import { Router } from "express";
import BlogPost from "../models/blogPost.model.js";
import { coverCloud } from '../middlewares/multer.js';
import { sendEmail } from "../middlewares/sendEmail.js";
import Comments from "../models/comment.model.js/";

export const apiRoutePosts = Router();


apiRoutePosts.get("/", async (req, res, next) => {
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

apiRoutePosts.get("/:id", async (req, res, next) => {
    try {
        let singlePost = await BlogPost.findById(req.params.id);
        res.send(singlePost)
    } catch (error) {
        next(error)
    }
});

apiRoutePosts.post("/", async (req, res, next) => {
    try {
        let makePost = await BlogPost.create(req.body);
        res.send(makePost);
        sendEmail(makePost.author.name)
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
        let blogPost = await BlogPost.findById(req.params.id);
        let comments = await Comments.find({ blog: req.params.id })
        res.send(comments)
    } catch (error) {
        next(error)
    }
})

apiRoutePosts.get("/:id/comments/:commentId", async (req, res, next) => {
    try {
        const blogPostId = req.params.id;
        const commentId = req.params.commentId;

        const blogPost = await BlogPost.findById(blogPostId);
        const comment = blogPost.comments.find((el) => el._id == commentId)
        res.send(comment)
    } catch (error) {
        next(error)
    }
})

apiRoutePosts.post("/:id", async (req, res, next) => {
    try {
        const blogPost = await BlogPost.findById(req.params.id);
        if (!blogPost) {
            return res.status(404).send('Post del blog non trovato');
        }
        const newComment = new Comments({
            comment: req.body.comment,
            author: blogPost.author, // Assicurati che l'autore del commento sia fornito nella richiesta
            blog: blogPost._id // Associa il commento al post del blog
        });

        // Salva il nuovo commento nel database
        const savedComment = await newComment.save();

        // Aggiorna l'array dei commenti nel post del blog con l'ID del nuovo commento
        blogPost.comments.push(savedComment._id);

        // Salva il post del blog aggiornato
        await blogPost.save();

        res.status(201).json(savedComment);

    } catch (error) {
        next(error)
    }
})

apiRoutePosts.put("/:id/comment/:commentId", async (req, res, next) => {
    try {
        const blogPostId = req.params.id;
        const commentId = req.params.commentId;

        const commentBody = req.body.comment;

        const post = await BlogPost.findById(blogPostId);

        const comments = post.comments.id(commentId);

        if (!comments) {
            return res.status(404).send('commento del blog non trovato');

        }

        comments.comment = commentBody;

        await post.save();

        res.send(comments);
    } catch (error) {
        next(error)
    }
})


apiRoutePosts.delete("/:id/comment/:commentId", async (req, res, next) => {
    try {
        const blogPostId = req.params.id;
        const commentId = req.params.commentId;

        const blog = await BlogPost.findById(blogPostId);
        const comments = blog.comments;

        const del = comments.find((el) => el._id == commentId);

        comments.pull(del);

        await blog.save();

        res.send(del)
    } catch (error) {
        next(error)
    }
})

