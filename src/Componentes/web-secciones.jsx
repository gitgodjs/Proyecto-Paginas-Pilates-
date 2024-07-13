import React from 'react'
import { Link } from 'react-router-dom'

function Secciones({image, title, text, link, buttonLink}) {
    return(
        <div className="contenedor-secciones" style={{backgroundImage: `url(${image})`}}>
            <section className='secciones-seccion'>  
                <div className="seccion__titulo">
                    <h2>{title}</h2>
                </div>     
                <div className='secciones__texto'>
                    <p>{text}</p>
                </div>
                <div className='secciones__leerMas'>
                    <Link className='secciones__leerMas-boton' to={link} >{buttonLink}</Link>
                </div>
            </section> 
        </div>
    )
}

export default Secciones