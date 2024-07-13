import React, { useState } from "react";
import { Link } from "react-router-dom";

const monthNames = [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
];

function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

function PagCalendario() {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const changeMonth = (delta) => {
        let newMonth = currentMonth + delta;
        let newYear = currentYear;

        if (newMonth < 0) {
            newMonth = 11;
            newYear -= 1;
        } else if (newMonth > 11) {
            newMonth = 0;
            newYear += 1;
        }

        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };

    const changeYear = (delta) => {
        setCurrentYear(currentYear + delta);
    };

    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = new Date(currentYear, currentMonth, 0).getDay();
    const daysArray = [...Array(firstDayOfMonth).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

    const weekend = [5,6, 12,13, 19,20, 26,27, 33,34]
    const lista = [null];

    for(let i = 0; i < weekend.length; i++){
        lista.push(daysArray[weekend[i]]);
    }

    const daate = new Date();
    const dia = daate.getDate();
    const mes = daate.getMonth() + 1;
    const aki = daate.getFullYear();

    const fechaActual = `${dia} / ${mes} / ${aki}`;


    return (
        <div className="contenedor-Calendario">
            <header className="header-Calendario">
                <div className="header__Calendario-mesYear">
                    <i className="fa-solid fa-chevron-left icono" onClick={() => changeMonth(-1)}></i> 
                    <span className="header__Calendario-span">{monthNames[currentMonth]}</span>
                    <i className="fa-solid fa-chevron-right icono" onClick={() => changeMonth(1)}></i>
                </div>

                <div className="header__Calendario-Fecha-Actual">
                    <span>{fechaActual}</span>
                </div>

                <div className="header__Calendario-mesYear">
                    <i className="fa-solid fa-chevron-left icono" onClick={() => changeYear(-1)}></i>
                    <span className="header__Calendario-span">{currentYear}</span>
                    <i className="fa-solid fa-chevron-right icono" onClick={() => changeYear(1)}></i>
                </div>
            </header>
            <div className="dias-mes">
                <section className="seccion-Dias">
                    <span>Lun</span>
                    <span>Mar</span>
                    <span>Mié</span>
                    <span>Jue</span>
                    <span>Vie</span>
                    <span>Sáb</span>
                    <span>Dom</span>
                </section>

                <div className="seccion-Dias-Numero">

                    {daysArray.map((day, index) => (
                        <span key={index} className={lista.includes(day) ? "empty" : "habil"}> 
                            <Link to={ lista.includes(day) ? "/calendario" : "/diasHabiles"} className="linkHabil"> {day} </Link> 
                        </span>
                    ))}

                </div>
            </div>
        </div>
    );
}

export default PagCalendario;
