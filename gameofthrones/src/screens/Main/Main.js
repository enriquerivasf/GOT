import React from "react";
import { Link } from 'react-router-dom';
import './Main.css';

function Main() {

  return (
    <div className="main-container">
      {/* Crea un enlace a la ruta "/families" */}
      <Link to="/families">
        <button className="buttonFamilies">CONOCE LAS FAMILIAS</button>
      </Link>

      {/* Crea un enlace externo al sitio web "https://quartermaester.info" */}
      <a href='https://quartermaester.info'>
        <button className="buttonMap" >VISITA EL MAPA</button>
      </a>
    </div>
  );
}

export default Main;