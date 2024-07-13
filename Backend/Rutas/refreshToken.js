const express = require("express");
const { jsonResponse } = require("../lib/jsonResponse");
const { verifyRefreshToken } = require("../auth/verifyTokens");
const { generateAccessToken }  = require("../auth/generateTokens");
const getUserInfo = require("../lib/getUserInfo");
const User = require("../schema/user");
const Token = require("../schema/token");
const router = express.Router();

router.post("/", async function (req, res, next) {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ error: "Token de actualización no proporcionado" });
    }

    try {
        // Buscar el token en la base de datos
        const tokenDocument = await Token.findOne({ token: refreshToken });
        
        if (!tokenDocument) {
            return res.status(403).json({ error: "Token de actualización inválido" });
        }

        // Verificar el token de actualización
        const payload = verifyRefreshToken(tokenDocument.token);
        
        // Obtener la información del usuario
        const userInfo = getUserInfo(payload.user);

        // Generar un nuevo token de acceso
        const accessToken = generateAccessToken(userInfo);
        // Responder con el nuevo token de acceso
        res.json(jsonResponse(200, { accessToken }));
    } catch (error) {
        console.log("Error al procesar el token de actualización:", error);
        return res.status(403).json({ error: "Token de actualización inválido" });
    }
});

module.exports = router;