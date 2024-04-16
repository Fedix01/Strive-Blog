export const authenticate = (req, res, next) => {
    const token = req.headers.authorization;

    if (token !== "Bearer prova") {
        const error = new Error("Non sei autorizzato");
        error.status = 401;
        next(error)
    }
    next()
}