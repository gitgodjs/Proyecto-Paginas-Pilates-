import React from "react";

function PagDiasHabiles() {
    return(
        <>
        <div className="contenedor-dias-Habiles">
            <div className="diasHabiles__contenido">
                <div className="diasHabiles__contenido__dias">
                    <div className="diasHabiles__contenido__dias-contenedores caja-dia caja-dia1">
                        <span>Lunes</span>
                    </div>

                    <div className="diasHabiles__contenido__dias-contenedores caja-dia caja-dia2">
                        <span>Martes</span>
                    </div>

                    <div className="diasHabiles__contenido__dias-contenedores caja-dia caja-dia3">
                        <span>Miércoles</span>
                    </div>
                    
                    <div className="diasHabiles__contenido__dias-contenedores caja-dia caja-dia2">
                        <span>Jueves</span>
                    </div>

                    <div className="diasHabiles__contenido__dias-contenedores caja-dia caja-dia1">
                        <span>Viernes</span>
                    </div>
                </div>
            </div>
            <div className="diasHabiles__contenido-texto">
                <h2>Horarios de Atención:</h2>
                <p className="contenido-texto">Lunes a Viernes:<span> 8:00 AM - 8:00 PM</span> <br />
                   Fines de Semana:<span> Cerrado</span>
                </p>
                
                <p className="contenido-texto">Nos encontramos disponibles para ayudarte a alcanzar tus objetivos de bienestar y fitness de lunes a viernes. Durante estos días, nuestro equipo de profesionales está listo para ofrecerte las mejores sesiones de Pilates en un ambiente acogedor y relajante. Recuerda que los fines de semana permanecemos cerrados, así que no dudes en programar tus clases entre semana.</p>

                <p className="contenido-texto">¡Esperamos verte pronto en nuestras clases!</p>
                <div className="diasHabiles__contenido-texto_ubicacion">
                    <i className="fa-solid fa-location-dot"></i>
                    <p className="contenido-texto">Castellanos 1508, Rosario, Santa Fe, Argentina</p>
                    <a href="https://maps.app.goo.gl/e1Ctazb4Cr6K6P2UA">Ver Mapa</a>
                </div>
            </div>
        </div>
        </>
    )
}

export default PagDiasHabiles;
