import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Result from "./pages/Result";
import "./index.css";

const App = () => {
  return (
    <>
      <nav>
        <Link to="/" className="button-link">🏠 Inicio</Link>
        <Link to="/game" className="button-link">🎮 Jugar</Link>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/result/:city/:lat/:lng/:guessLat/:guessLng" element={<Result />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
