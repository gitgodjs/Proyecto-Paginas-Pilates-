import React from 'react';
import '../src/App.css';

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from './Componentes/web-header';
import PagInicio from './Paginas/Estudio__pagina-inicio';
import PagRegistro from './Paginas/Estudio__pagina-resgistro';
import PagQueHacemos from './Paginas/Estudio_pagina-hacemos';
import PagComentarios from './Paginas/Estudio_pagina-comentarios';
import PagCalendario from './Paginas/Estudio_pagina-calendario';
import PagDiasHabiles from './Paginas/Estudio__pagina-diasHabiles';
import PagIngreso from './Paginas/Estudio_pagina-ingresarCuenta';
import Footer from './Componentes/web-footer';
import ProtectedRoute from './Paginas/ProteccionRuta';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<PagInicio />} />
          <Route path="/queHacemos" element={<PagQueHacemos />} />
          <Route path="/comentarios" element={<ProtectedRoute/>} />
          <Route path="/calendario" element={<PagCalendario />} />
          <Route path="/diasHabiles" element={<PagDiasHabiles />} />
          <Route path="/registro" element={<PagRegistro />} />
          <Route path="/ingreso" element={<PagIngreso />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
