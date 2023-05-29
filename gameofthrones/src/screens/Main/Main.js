import React from "react";
import { Link } from 'react-router-dom';
import './Main.css';
import '../../font/game-of-thrones-maisfontes.afa8/game-of-thrones.ttf';
document.body.classList.add('Main');

function Main() {
  
  return (
    <div className="main-container">
      <Link to="/families">
        <button className="inicio">CONOCE LAS FAMILIAS</button>
      </Link>
    </div>
  );
}

export default Main;