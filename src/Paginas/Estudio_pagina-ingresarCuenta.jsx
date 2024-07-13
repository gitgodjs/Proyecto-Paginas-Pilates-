import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Autenticado/AuthProvider";
import { API_URL } from "../Autenticado/constants";

function PagIngreso() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorr, setErrorr] = useState("");
    const [errorText, setErrorText] = useState("");

    const goTo = useNavigate();
    const auth = useAuth();
    if (auth.isAuthenticated) {
        return <Navigate to="/comentarios" />
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password,
                })
            });

            if (response.status === 200) {
                const data = await response.json();

                if (data.body.accessToken && data.body.refreshToken) {
                    auth.saveUser(data);
                    goTo("/comentarios");
                }
            } else {
                const json = await response.json();
                const errorJson = json.body.error;

                setErrorText(errorJson);
                setErrorr("error-form");
            }
        } catch (error) {
            console.log("Error en la solicitud:", error);
        }
    }

    return(
        <>
            <div className="contenedor-registro">
                <form className="contenido_formulario" onSubmit={handleSubmit}>
                    <h2>Ingresa a tu cuenta</h2>
                    <span className={errorr}>{errorText}</span>
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                    type="email" 
                    id="email"
                    className="email"
                    placeholder="Ejemplo: carlos@gmail.com"
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    /> 
                    
                    <label htmlFor="password">Contraseña:</label>
                    <input 
                    type="password" 
                    id="password"
                    className="password"
                    placeholder="Ejemplo: PEPE123"
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />

                    <p>Si todavía no tienes una cuenta, toca aquí <Link to="/registro">Registrar</Link>.</p>

                    <div className="boton_registro">
                        <button type="submit">Ingresar</button>
                    </div>
                    
                </form>
            </div>
        </>
    )
};

export default PagIngreso;
