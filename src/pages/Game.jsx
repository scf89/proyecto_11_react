import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MapComponent from "../components/MapComponent";
import { getRandomCapital } from "../utils/api";

const Game = () => {
  const [capital, setCapital] = useState(null);
  const [guess, setGuess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCapital = async () => {
      const data = await getRandomCapital();
      setCapital(data);
    };
    fetchCapital();
  }, []);

  const handleGuess = (coords) => {
    setGuess(coords);
    navigate(`/result/${capital.name}/${capital.lat}/${capital.lng}/${coords.lat}/${coords.lng}`);
  };

  return (
    <div className="container">
      <h2>📍 ¿Dónde está {capital?.name} ({capital.country})?</h2>
      {capital && <MapComponent capital={capital} onGuess={handleGuess} />}
    </div>
  );
};

export default Game;
