import React from "react"
//contenedor-footer
function Footer() {
    return (
        <>
            <div className="contenedor__footer">
                <footer className="footer__contenido">
                    <div className="footer__contacto">
                        <h3>Quien soy!</h3>
                        <p>Hola! Soy Juan, el programdor de esta pagina. Espero que te este gustando. Contactame!</p>
                        <p>WhatsApp: +54 9 341 275-3122</p>
                    </div>
                    <div footer="footer__derechos">
                        &copy; 2024 Josefina Estudio Pilates | Todos los derechos reservados
                    </div>
                </footer>
            </div>
        </>
    );
}

export default Footer