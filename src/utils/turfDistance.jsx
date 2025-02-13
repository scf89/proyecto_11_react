import * as turf from "@turf/turf";

export const turfDistance = (coords1, coords2) => {
  // Crea puntos a partir de las coordenadas
  const point1 = turf.point([coords1.lng, coords1.lat]);
  const point2 = turf.point([coords2.lng, coords2.lat]);

  // Calcula la distancia entre los puntos en kilómetros
  const distance = turf.distance(point1, point2, { units: "kilometers" });
  return distance;
};
