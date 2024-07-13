import React from "react";

const SistemaDeEstrellas = ({ puntaje, setPuntaje, editable }) => {
    const estrellas = [1, 2, 3, 4, 5];

    function manejarClick(index) {
        if (editable) {
            setPuntaje(index + 1);
        }
    }

    return (
        <div className="comentario__estrellas">
            {estrellas.map((index) => (
                <i
                    key={index}
                    className={`fa-${index < puntaje ? 'solid' : 'regular'} fa-star comentario__estrella`}
                    onClick={() => manejarClick(index)}
                ></i>
            ))}
            <span className="comentario__promedio-puntaje">
                {puntaje - 1}
            </span>
        </div>
    );
};

export default SistemaDeEstrellas;
