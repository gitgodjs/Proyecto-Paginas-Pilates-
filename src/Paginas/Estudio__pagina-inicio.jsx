import React from "react";
import Secciones from '../Componentes/web-secciones';

function PagInicio() {
    function verScroll() {
        window.scrollTo({
            top: 640,
            behavior: 'smooth'
        });
    }

    return (
        <>
        <div className="presentacion-contenedor">
            <div className="presentacion-contenido">
                <h1 className="presentacion_contenido-titulo">Bienvenidos a<br /> <span>Josefina Estudio Pilates</span></h1>

                <div className="presentacion__contenido-ubicacion">
                    <i className="fa-solid fa-location-dot"></i>
                    <p className="contenido-texto">Castellanos 1508, Rosario, Santa Fe, Argentina</p>
                    <a href="https://maps.app.goo.gl/e1Ctazb4Cr6K6P2UA">Ver Mapa</a>
                </div>
                
                <div className="navegar_pagina">
                    <i className="fa-solid fa-chevron-down" onClick={verScroll}></i>
                </div>
            </div>
        </div>
        <div className='secciones-grid'>
            <Secciones 
            buttonLink="Qué hacemos?" 
            link="/queHacemos" 
            title="¿Por Qué Hacer Pilates?" 
            text="Hacer Pilates es una excelente manera de mejorar tu bienestar físico y mental. Este método de ejercicio se enfoca en fortalecer el núcleo del cuerpo, mejorar la flexibilidad y aumentar la conciencia corporal. Al practicar Pilates regularmente, puedes experimentar una mejor postura, menos dolores y tensiones musculares, y una mayor resistencia física. Además, Pilates es adaptable a diferentes niveles de habilidad y condiciones físicas, lo que lo convierte en una opción accesible para todos, desde principiantes hasta atletas experimentados. Incorporar Pilates en tu rutina diaria puede ayudarte a sentirte más equilibrado, fuerte y en sintonía con tu cuerpo." 
            image={'https://imgs.search.brave.com/rvkUv6jsqCxpBtcH2h8e7MqRH7GhlO7Av-XFQic-jX0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM2/NDkzMTU4OC9waG90/by9tYW4tZG9pbmct/cGlsYXRlcy1pbi1z/dHVkaW8uanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPUhvcHoy/VUFBVnBRR3Vpa0Ni/dHgyV3B0UHEzOENk/d0ZIcHVXNWZxSUEz/OUE9'}
            />

            <Secciones 
            buttonLink="Calendario" 
            link="/calendario" 
            title="Nuestras Clases" 
            text="En nuestro estudio, ofrecemos clases de Pilates bien asistidas y con una excelente relación con el público. Nuestro equipo de instructores altamente capacitados se dedica a proporcionar una atención personalizada a cada alumno, asegurándose de que todas las posturas y ejercicios se realicen de manera segura y efectiva. Valoramos la comunicación abierta y el feedback constante, lo que nos permite adaptar nuestras clases a las necesidades y expectativas de nuestros participantes. Nuestro objetivo es crear un ambiente acogedor y profesional donde te sientas motivado y apoyado en cada paso de tu viaje hacia el bienestar." 
            image={'https://imgs.search.brave.com/T-9cC-H-RxhYdaB9Z2cQ8nWNLksKf9oirG5Pkf_MByI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by93/b21hbi1wcmFjdGlj/ZS1waWxhdGVzLXlv/Z2EtZ3ltXzEzMDMt/MjMxMzIuanBnP3Np/emU9NjI2JmV4dD1q/cGc'}
            />

            <Secciones 
            buttonLink="Comentarios" 
            link="/comentarios" 
            title="Revisa Nuestros Comentarios" 
            text="Mira nuestro calendario de clases y eventos en nuestra página web. ¡Mantente al día con nuestras últimas ofertas, talleres especiales y horarios de clases regulares! Queremos escuchar tu opinión, por lo que te animamos a dejar tus comentarios y sugerencias. Tu feedback es invaluable para nosotros y nos ayuda a mejorar continuamente nuestra oferta y servicios. Ya sea que seas nuevo en Pilates o un veterano experimentado, nos encantaría que formaras parte de nuestra comunidad. ¡Visita nuestro calendario y participa en nuestras clases para descubrir los beneficios del Pilates y unirte a nuestro vibrante grupo de entusiastas del bienestar!" 
            image={'https://imgs.search.brave.com/bbDW-4JVjBLq7ynPY6WWSYRYrfbmvDxCxUy0UQuy1ZE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzA5LzUxLzQw/LzM2MF9GXzEwOTUx/NDA5MV9VQjlhdjJo/U1FFb2RSdGM1bTJw/SWRMVUVYVnpHRkpT/Wi5qcGc'}
            />
        </div>
        </>
    );
}

export default PagInicio;
