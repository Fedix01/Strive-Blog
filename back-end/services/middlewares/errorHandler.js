export const badRequestHandler = (err, req, res, next) => {
    if (err.status === 400) {
        res.status(400).send({
            success: false,
            message: err.message,
            errorsList: err.errorsList?.map((e) => e.msg) || [],
        });
    } else {
        next(err);
    }
};


export const unhatorizedHandler = (err, req, res, next) => {
    if (err.status === 401) {
        res.status(401).send({
            success: false,
            message: err.message
        })
    } else {
        next(err)
    }
}

export const notFoundHandler = (err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).send({
            success: false,
            message: err.message
        })
    } else {
        next(err)
    }
}

export const genericErrorHandler = (err, req, res, next) => {
    console.log("ERROR", err);

    res.status(500).send({
        success: false,
        message: "Errore generico"
    })
}