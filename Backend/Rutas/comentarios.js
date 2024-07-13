const router = require("express").Router();
const { json } = require("react-router-dom");
//const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user");
const Comentario = require("../schema/comentarios");
const jsonResponse = (status, data) => ({ status, data });

router.get("/", async (req, res) => {
    try {
        const comentarios = await Comentario.find();
        res.status(200).json(jsonResponse(200, comentarios));
    } catch (error) {
        console.error('Error al obtener comentarios:', error);
        res.status(500).json(jsonResponse(500, { error: "No pudimos obtener los comentarios" }));
    }
});

router.post("/", async (req, res) => {
    const { content, author, estrellas, imageUrl } = req.body;

    if (!content || !author || !estrellas) {
        return res.status(400).json(
            jsonResponse(400, {
                error: "Todos los campos son requeridos"
            })
        );
    }

    try {
        const nuevoComentario = new Comentario({ content, author, estrellas, imageUrl });
        await nuevoComentario.save();
        return res.status(200).json(
            jsonResponse(200, { 
                message: "Publicado", comment: nuevoComentario 
            })
        );
    } catch (error) {
        return res.status(500).json(
            jsonResponse(500, { error: "No se pudo publicar" })
        );
    }

})

module.exports = router;