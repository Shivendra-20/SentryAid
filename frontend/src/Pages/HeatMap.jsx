import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";

// Function to generate points inside a rectangular region
const generateRegionPoints = (
  latStart,
  lngStart,
  latEnd,
  lngEnd,
  intensity,
  count = 300
) => {
  const points = [];
  for (let i = 0; i < count; i++) {
    const lat = latStart + Math.random() * (latEnd - latStart);
    const lng = lngStart + Math.random() * (lngEnd - lngStart);
    points.push([lat, lng, intensity]);
  }
  return points;
};

// Heatmap layer component
const HeatmapLayer = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    const heatLayer = L.heatLayer(points, {
      radius: 40,
      blur: 30,
      max: 4, // max intensity matches highest region
      gradient: {
        0.0: "#00ff00", // green
        0.5: "#ffff00", // yellow
        1.0: "#ff0000", // red
      },
    }).addTo(map);

    return () => map.removeLayer(heatLayer);
  }, [map, points]);

  return null;
};

const HeatMap = () => {
  // Four regions with intensities
  const redRegion = generateRegionPoints(23.78, 90.38, 23.82, 90.42, 4, 300); // fully red
  const yellowRegion = generateRegionPoints(23.76, 90.43, 23.8, 90.47, 3, 300); // fully yellow
  const greenRegion1 = generateRegionPoints(23.72, 90.38, 23.76, 90.42, 2, 300); // fully green
  const greenRegion2 = generateRegionPoints(23.74, 90.45, 23.78, 90.49, 2, 300); // fully green

  const allPoints = [
    ...redRegion,
    ...yellowRegion,
    ...greenRegion1,
    ...greenRegion2,
  ];

  return (
    <div className="w-full p-12 bg-pink-50">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="sm:text-xl text-lg font-bold text-gray-800 mb-8">
          🚨 Accident Heatmap
        </h2>
        <span className="hidden sm:flex text-sm text-gray-500">
          Updated live
        </span>
      </div>
      <MapContainer
        center={[23.77, 90.41]}
        zoom={12}
        className="min-h-screen w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <HeatmapLayer points={allPoints} />
      </MapContainer>
    </div>
  );
};

export default HeatMap;
