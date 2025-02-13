import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer } from "ol/layer";
import { fromLonLat, toLonLat } from "ol/proj";
import XYZ from 'ol/source/XYZ.js';

const MapComponent = ({ capital, onGuess }) => {
  const mapRef = useRef();

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({ 
          source: new XYZ({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            attributions: '&copy; <a href="https://www.esri.com/">Esri</a>'
          }),
       }),
      ],
      view: new View({ center: fromLonLat([0, 0]), zoom: 2 }),
    });

    map.on("click", (event) => {
      const coords = toLonLat(event.coordinate);
      onGuess({ lat: coords[1], lng: coords[0] });
    });

    return () => map.setTarget(null);
  }, [capital]);

  return <div ref={mapRef} className="map-container"></div>;
};

export default MapComponent;
