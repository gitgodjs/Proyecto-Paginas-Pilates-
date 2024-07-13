const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user");

router.post("/", async (req, res) => {
    const { imageUrl, name, email, password } = req.body;

    if (!imageUrl || !name || !email || !password || password.length < 8) {
    
        if (password && password.length < 8) {
            errorMessage = 'contraseña demasiado corta';
        }
    
        return res.status(400).json(
            jsonResponse(400, {
                error: "Contraseña demasiado corta"
            })
        );
    }

    try {
        const nameExist = await User.nameExist(name);
        const emailExist = await User.emailExist(email);

        if (nameExist) {
            console.log("Error: El nombre ya está en uso.");
            return res.status(400).json(
                jsonResponse(400, {
                    error: "El nombre ya está en uso."
                })
            );
        }

        if (emailExist) {
            console.log("Error: El correo electrónico ya está en uso.");
            return res.status(400).json(
                jsonResponse(400, {
                    error: "El correo electrónico ya está en uso."
                })
            );
        }

        const newUser = new User({ imageUrl, name, email, password });
        await newUser.save();

        console.log("Usuario creado exitosamente");

        return res.status(200).json(
            jsonResponse(200, 
                { message: "Usuario creado!" }
            )
        );

    } catch (error) {
        console.error("Error al crear el usuario:", error);
        return res.status(500).json(
            jsonResponse(500, {
                error: "Error al crear el usuario!"
            })
        );
    }
});

module.exports = router;
