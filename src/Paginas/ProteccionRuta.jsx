import { Outlet, Navigate } from "react-router-dom";
import { useState } from 'react';
import PagComentarios from "./Estudio_pagina-comentarios";
import PagRegistro from "./Estudio__pagina-resgistro";
import { useAuth } from "../Autenticado/AuthProvider";

function ProtectedRoute(){
    const auth = useAuth();

    return auth.isAuthenticated ? <PagComentarios/> : <PagRegistro/>
}


export default ProtectedRoute;