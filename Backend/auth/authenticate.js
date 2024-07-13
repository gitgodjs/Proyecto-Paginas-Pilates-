const getTokenFromHeader = require('./getTokenFromHeader');
const { verifyAccessToken } = require('./verifyTokens');

function authenticate(req, res, next) {
    try {
        console.log("Headers: ", req.headers); 
        const token = getTokenFromHeader(req.headers);

        if (token) {
            const decoded = verifyAccessToken(token);
            if (decoded) {
                req.user = { ...decoded.user };
                next();
            } else {
                res.status(401).json({
                    message: "Token inválido",
                });
            }
        } else {
            res.status(401).json({
                message: "No tienes Token",
            });
        }
    } catch (error) {
        console.error('Error en authenticate:', error);
        res.status(500).json({
            message: "Error en el servidor",
        });
    }
}

module.exports = authenticate;