const router = require("express").Router();
const { json } = require("express");
const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user");
const getUserInfo = require("../lib/getUserInfo");


router.post("/", async (req, res) => {
    const { email, password } = req.body;

    if (!!!email || !!!password) {
        return res.status(400).json(
            jsonResponse(400, {
            error: "Fields are required"
            })
        );
    }

    const name = await User.findOne({ email });

    if(name){
        const correctPassword = await name.comparePassword(password, name.password);

        if(correctPassword){
            const accessToken = name.createAccessToken();
            const refreshToken = await name.createRefreshToken();
            
            res.status(200).json(
                jsonResponse(200, { name: getUserInfo(name) , accessToken, refreshToken })
            );
        } else {
            res.status(400).json(
                jsonResponse(400, {
                    error: "No existe esta contraseña."
                })
            );
        } 


    } else{
        res.status(400).json(
            jsonResponse(400, {
                error: "No existe este usuario."
            })
        );
    }
});


module.exports = router;