import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Autenticado/AuthProvider";

function Header() {
  const [isChecked, setIsChecked] = useState("checked");
  const [isRegistrado, setIsRegistrado] = useState("");
  const [isRegColor, setIsRegColor] = useState("");

  function handleCheckboxChange(){
    setIsChecked(!isChecked);
  };
  let auth = useAuth();

  const handleLogout = () => {
    auth.logout(); // Llama al método de cierre de sesión de tu hook de autenticación
    setIsRegistrado("Regístrate");
    setIsRegColor("link-Lista-estudio");
  };

  useEffect(() => {
    if (auth.isAuthenticated === true) {
      setIsRegistrado("Cerrar sesión");
      setIsRegColor("cerrar-sesion");
    } else {
      setIsRegistrado("Regístrate");
      setIsRegColor("link-Lista-estudio");
    }
  }, [auth]);

    return(
      <div className="contenedor-header">
        
        <div className="header__nombre-estudio">
            <Link to='/' className="header__nombre-estudio-link"><h1 className="header__logo-estudio">Josefina <span>Estudio Pilates</span></h1></Link>
        </div>
        
        
        
        <input 
          type="checkbox" 
          id="menu-toggle" 
          className="header__Button-responsive-estudio" 
          onChange={handleCheckboxChange}
          checked={isChecked}
        />
          <label htmlFor="menu-toggle" className="header__hamburguesa-estudio">
              <div></div>
              <div></div>
              <div></div>
          </label>

        <nav className="header__contenedor_lista-estudio">
            
            <h2 className="header__logo-estudio">Josefina<span>EstudioPilates</span></h2>
            
            <ul className="header__lista-estudio"> 

                <li className="header__elemento_lista-estudio">
                  <Link to="/" className="link-Lista-estudio">Inicio</Link>
                </li>

                <li className="header__elemento_lista-estudio">
                  <Link to="/queHacemos" className="link-Lista-estudio">Que Hacemos</Link>
                </li>

                <li className="header__elemento_lista-estudio">
                  <Link to="/comentarios" className="link-Lista-estudio">Comentarios</Link>
                </li>

                <li className="header__elemento_lista-estudio">
                  <Link to="/calendario" className="link-Lista-estudio">Calendario</Link>
                </li>

                <li className="header__elemento_lista-estudio">
                  <Link to="/registro" className={isRegColor} onClick={handleLogout}>{isRegistrado}</Link>
                </li>
            </ul>
        </nav>
        
      </div>
    );
}

export default Header