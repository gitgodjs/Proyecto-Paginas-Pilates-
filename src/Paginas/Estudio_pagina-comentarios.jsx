import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../Autenticado/AuthProvider";
import { API_URL } from "../Autenticado/constants";
import SistemaDeEstrellas from "../Componentes/web-estrellas";

function PagComentarios() {
    const [comentando, setComentando] = useState("contenedor-ventana_cerrada");
    const [imagenUsuarioC, setImagenUsuarioC] = useState("");
    const [contenido, setContenido] = useState("");
    const [puntaje, setPuntaje] = useState(1);
    const [comentarios, setComentarios] = useState([]);
    const [usuario, setUsuario] = useState("");
    const textareaRef = useRef(null);
    const [filtroEstrellas, setFiltroEstrellas] = useState(0);
    const [avisoComentarios, setAvisoComentarios] = useState("");
    const [comentarioPublicadoAviso, setComentarioPublicadoAviso] = useState("esperandoPublicar");
    const filtro = [0, 1, 2, 3, 4, 5];

    const auth = useAuth();
    const objetoUser = auth.getUser();

    // CONTROL DE LA API
    // VER LOS COMENTARIOS ACTUALES
    const promesaNom = (obtenerUser) => {
        return new Promise((resolve) => {
            resolve(obtenerUser);
        });
    };

    function filtroSelect(e) {
        const opcion = Number(e.target.value);
        setFiltroEstrellas(opcion);
    }

    useEffect(() => {
        const obtenerNombre = async () => {
            try {
                const obtenerUser = await promesaNom(auth.getUser());
                const nombre = obtenerUser.body ? obtenerUser.body.name : obtenerUser.name.name;
                setUsuario(nombre);
            } catch (error) {
                console.error("Error al obtener el nombre:", error);
            }
        };

        obtenerNombre();
    }, [auth]);

    useEffect(() => {
        async function obtenerComentarios() {
            try {
                const response = await fetch(`${API_URL}/comentarios`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('No hay comentarios');
                }

                const data = await response.json();
                setImagenUsuarioC(objetoUser.body ? objetoUser.body.imageUrl : objetoUser.name.imageUrl);
                const estrellasFiltradas = filtroEstrellas;
                if (estrellasFiltradas === 0) {
                    setComentarios(data.data);
                } else {
                    const comentariosFiltrados = data.data.filter(comentario => comentario.estrellas === estrellasFiltradas);
                    setComentarios(comentariosFiltrados);
                    if (comentariosFiltrados.length === 0) {
                        setAvisoComentarios("");
                    } else {
                        setAvisoComentarios("comentarios__aviso");
                    }
                }

            } catch (error) {
                console.error('No se pudieron obtener comentarios:', error);
            }
        }

        obtenerComentarios();
    }, [filtroEstrellas]);

    // PUBLICAR UN NUEVO COMENTARIO
    const promesaImagen = (imagenUsuario) => {
        return new Promise((resolve) => {
            resolve(imagenUsuario)
        })
    };

    const publicarComentario = async () => {
        const puntajeCorrecto = puntaje - 1;
        const imagenUsuario = await promesaImagen(auth.getUser());
        const imagen = imagenUsuario.body ? imagenUsuario.body.imageUrl : imagenUsuario.name.imageUrl;
        const nuevoComentario = { imageUrl: imagen, content: contenido, author: usuario, estrellas: puntajeCorrecto };
        try {
            const response = await fetch(`${API_URL}/comentarios`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevoComentario)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error del servidor:", errorData);
                throw new Error("No se pudo publicar el comentario");
            }

            const data = await response.json();
            setComentarios(prevComentarios => [...prevComentarios, data.data.comment]);
            cerrarVentana();
            comentarioPublicado();
        } catch (error) {
            console.error("Error al publicar comentario:", error);
        }
    };

    // CIERRE CONTROL API
    function comentarioPublicado() {
        setComentarioPublicadoAviso("");
        setTimeout(() => {
            setComentarioPublicadoAviso("esperandoPublicar");
        }, 3000);
    };

    function comentar() {
        setComentando("contenedor-ventana");
        window.scrollTo({
            top: 100,
            behavior: 'smooth'
        });
        document.body.style.overflow = 'hidden';
    }

    const handleChange = (e) => {
        setContenido(e.target.value);
    };

    function cerrarVentana() {
        setComentando("contenedor-ventana_cerrada")
        document.body.style.overflow = 'auto';
        setContenido("");
        setPuntaje(1);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    function comentarDesplazamiento() {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    }

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [contenido]);

    const cantidadLetras = contenido.length;

    return (
        <>
            <div className={`mensaje_comentario-publicado ${comentarioPublicadoAviso}`}>
                <div className="mensaje_comentario-icono">
                    <i className="fa-solid fa-check"></i>
                </div>
                <div className="mensaje_comentario-texto">
                    <span>¡Gracias! 🤗</span>
                    <p>¡Comentario publicado!</p>
                </div>
            </div>
            <div className="contenedor_filtro">
                <label htmlFor="options">Filtra comentarios: </label>
                <div>
                    <select id="options" onChange={filtroSelect}>
                        {filtro.map((value, index) => (
                            <option
                                key={index}
                                className="opcion_filtro"
                                value={value}>
                                {value === 0 ? "Todos" : `${value} Estrellas`}
                            </option>
                        ))}
                    </select>
                    <button onClick={comentarDesplazamiento}>Comentar V</button>
                </div>
            </div>
            <div className={comentando}>
                <div className="ventana_comentando">
                    <div className="contenedor_comentando-cerrar">
                        <div className="contenedor_comentando-input">
                            <div className="comentando__contenedor-imagen">
                                <img className="comentario__imagen" src={imagenUsuarioC} alt="Usuario" />
                                <div className="comentando__contenedor-usuario">
                                    <span className="usuario__comenta">@{usuario}</span>
                                </div>
                            </div>
                            <label htmlFor="comentario">Tu comentario:</label>
                            <div className="contenido_comentario">
                                <textarea
                                    id="comentario"
                                    ref={textareaRef}
                                    className="comentario__input"
                                    value={contenido} 
                                    onChange={handleChange}
                                    maxLength={256}
                                    minLength={9}
                                    placeholder="Escribe tu comentario aquí..."
                                    style={{ overflow: 'hidden', resize: 'none', minHeight: '20px' }}
                                    rows={1}
                                />
                                <span>{cantidadLetras}/256</span>
                            </div>
                        </div>
                        <div className="contenedor_cerrar-ventana">
                            <i className="cerrar_ventana fa-solid fa-x" onClick={cerrarVentana}></i>
                        </div>
                    </div>
                    <div className="contenedor_estrellas-publicar">
                        <div className="contenido_estrellas-publicar">
                            <SistemaDeEstrellas puntaje={puntaje} setPuntaje={setPuntaje} editable={true} />
                            <button
                                className="publicar_comentario"
                                onClick={publicarComentario}
                                disabled={contenido.length < 9}
                            >
                                Publicar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {comentarios.length === 0 && (
                <div className="no-hay_comentarios">
                    <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
                </div>
            )}
            <div className="contenedor_comentrios-grid">
            {comentarios.map((comentario, index) => (
                <div key={index} className="contenedor-comentario">
                    <div className="contenido-comentario">
                        <div className="comentario__usuario-fecha">
                            <div className="contenedor-comentario__imagen">
                                <img className="comentario__imagen" src={comentario.imageUrl} alt={`Usuario ${index + 1}`} />
                            </div>
                            <span className="comentario__usuario">{comentario.author}</span>
                            <span className="fecha">
                            {new Date(comentario.date).toLocaleString('es-AR', {
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric', 
                                hour: 'numeric', 
                                minute: 'numeric', 
                                hour12: true 
                            })}
                            </span>
                        </div>
                        <div className="comentario__contenido">
                            <p className="comentario__comenta">{comentario.content}</p>
                            <div className="contenedor__comentario-puntaje">
                                <SistemaDeEstrellas puntaje={comentario.estrellas + 1} setPuntaje={() => { }} editable={false} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            </div>
            <div className="agregar_comentario">
                <button className="boton_agregar" onClick={comentar}>
                    <i className="fa-regular fa-comment-dots"></i>
                </button>
            </div>
        </>
    );
}

export default PagComentarios;
