import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Autenticado/AuthProvider";
import { API_URL } from "../Autenticado/constants";
import axios from 'axios';

function PagRegistro() {
    const [imagen, setImagen] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorr, setErrorr] = useState("");
    const [errorText, setErrorText] = useState("");
    const goTo = useNavigate();
    const auth = useAuth();

    if (auth.isAuthenticated) {
        return <Navigate to="/comentarios" />
    };

    function handleImage(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagen(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleImageClick = () => {
        document.getElementById('imagen').click();
    };

    async function uploadImageToFirebase(image) {
        try {
            const formData = new FormData();
            formData.append('image', image); // Agrega el archivo al FormData
    
            const response = await fetch(`http://localhost:4000/api/upload`, {
                method: 'POST',
                body: formData,
            });
    
            const data = await response.json();
            const imageUrl = data.imageUrl;
            return imageUrl; // Devuelve la URL de la imagen subida
    
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            throw new Error('Error al subir la imagen a Firebase.');
        }
    }
    
    async function handleSubmit(e) {
        e.preventDefault();
    
        try {
            // Subir imagen a Firebase Storage
            const imageUrl = await uploadImageToFirebase(imagen);

            // Enviar datos incluyendo el URL de la imagen al backend
            const response = await axios.post(`${API_URL}/signup`, {
                imageUrl,
                name,
                email,
                password
            });
    
            console.log("respuesta: ", response);
            goTo("/ingreso");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errorJson = error.response.data.body.error
                //setErrorText(errorJson);
                setErrorr("error-form");
            } else {
                console.error("Error en la solicitud:", error);
            }
        }
    }
    

    return (
        <>
            <div className="contenedor-registro">
                <form className="contenido_formulario" onSubmit={handleSubmit} encType="multipart/form-data">
                    <h2>Regístrate</h2>
                    <span className={errorr}>{errorText}</span>
                    
                    <div className="registro_organizado-grid">
                        <div className="organizado_imagen">
                            <div className="contenedor_imagen-usuario">
                                <img
                                    className="imagen_usuario-ingreso"
                                    src={imagen || "https://imgs.search.brave.com/8LvdQPG1DawE9pRsvATOqCipf8JRmUWE9xYDBaucu1o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzY1LzEwLzQ3/LzM2MF9GXzY1MTA0/NzE4X3gxN2E3Nnd6/V0tJbTNCbGhBNnV5/WVZrRHM5OTgyYzZx/LmpwZw"}
                                    onClick={handleImageClick}
                                    style={{ cursor: 'pointer' }}
                                    required
                                ></img>
                                <input
                                    className="input_imagen"
                                    type="file"
                                    id="imagen"
                                    accept="image/*"
                                    onChange={handleImage}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        </div>
                        <div className="organizado_textos">
                            <label htmlFor="name">Nombre:</label>
                            <input 
                                type="text"
                                id="name" 
                                className="name"
                                placeholder="Ejemplo: Juan"
                                required 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <label htmlFor="email">Correo Electrónico:</label>
                            <input
                                type="email" 
                                id="email"
                                className="mail"
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
                        </div>
                    </div>
                    
                    <p>Si ya tienes una cuenta y deseas ingresar, toca aquí <Link to="/ingreso">Ingresar</Link>.</p>

                    <div className="boton_registro">
                        <button type="submit">Registrarse</button>
                    </div>
                    
                </form>
            </div>
        </>
    )
}

export default PagRegistro;
