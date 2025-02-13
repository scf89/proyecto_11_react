import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <h1>🌍 GeoGuess Game</h1>
      <p>¿Puedes adivinar la ubicación de una capital en el mapa?</p>
      <Link to="/game" className="button-link">Empezar Juego</Link>
    </div>
  );
};

export default Home;
