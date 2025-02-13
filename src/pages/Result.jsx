import React, { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { turfDistance } from "../utils/turfDistance";
import "ol/ol.css";
import { Map } from "ol";
import { View } from "ol";
import { Tile as TileLayer } from "ol/layer";
import { fromLonLat } from "ol/proj";
import { Feature } from "ol";
import { Point, LineString } from "ol/geom";
import { Style, Fill, Stroke, Circle as CircleStyle } from "ol/style";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import XYZ from 'ol/source/XYZ.js';

const Result = () => {
  const { city, lat, lng, guessLat, guessLng } = useParams();
  const distance = turfDistance(
    { lat: parseFloat(lat), lng: parseFloat(lng) },
    { lat: parseFloat(guessLat), lng: parseFloat(guessLng) }
  );

  const mapRef = useRef(null);

  useEffect(() => {
    const realCoords = [parseFloat(lng), parseFloat(lat)];
    const guessCoords = [parseFloat(guessLng), parseFloat(guessLat)];

    // Add real point
    const realPoint = new Feature({
      geometry: new Point(fromLonLat(realCoords)),
    });
    realPoint.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 10,
          fill: new Fill({ color: "red" }),
        }),
      })
    );

    // Add guessed point
    const guessedPoint = new Feature({
      geometry: new Point(fromLonLat(guessCoords)),
    });
    guessedPoint.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 10,
          fill: new Fill({ color: "blue" }),
        }),
      })
    );

    // Line between the points (using LineString)
    const line = new Feature({
      geometry: new LineString([fromLonLat(realCoords), fromLonLat(guessCoords)]),
    });
    line.setStyle(
      new Style({
        stroke: new Stroke({
          color: "#ffcc00",
          width: 4,
        }),
      })
    );

    const vectorSource = new VectorSource({
      features: [realPoint, guessedPoint, line],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    // Create OpenLayers map
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            attributions: '&copy; <a href="https://www.esri.com/">Esri</a>'
          }),
        }),
        new VectorLayer({
          source: new VectorSource(),
        }),
      ],
      view: new View({
        center: fromLonLat(realCoords),
        zoom: 6,
      }),
    });

    map.addLayer(vectorLayer);

    return () => map.setTarget(null);
  }, [lat, lng, guessLat, guessLng]);

  return (
    <div className="container">
      <h2>📌 Resultado</h2>
      <p>La capital era: <strong>{city}</strong></p>
      <p>Tu distancia: <strong>{distance.toFixed(2)} km</strong></p>
      <div
        ref={mapRef}
        style={{ width: "100%", height: "500px", marginBottom: "20px" }}
      ></div>
      <Link to="/game" className="button-link">
        Jugar otra vez
      </Link>
    </div>
  );
};

export default Result;
