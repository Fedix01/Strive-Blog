
import Comments from "../models/comment.model.js"


// Middleware per controllare l'autore del commento
export const checkCommentAuthor = async (req, res, next) => {
    try {
        const commentId = req.params.commentId;
        const userId = req.user.id; // ID dell'utente che sta effettuando la richiesta

        const comment = await Comments.findById(commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        // Verifica se l'utente che sta effettuando la richiesta è l'autore del commento
        if (comment.author.toString() !== userId) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        // Se l'utente è l'autore del commento, passa al prossimo middleware
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};