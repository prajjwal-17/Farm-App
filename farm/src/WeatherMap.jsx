import { useEffect } from "react";
import L from "leaflet"; // Import Leaflet
import "leaflet/dist/leaflet.css";

const WeatherMap = () => {
  useEffect(() => {
    const map = L.map("map").setView([13.1544, 79.1895], 5); // Set initial view (lat, lon, zoom)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    L.tileLayer(
      `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=f1b61de0287ce77fa1f9f1073a0a0894`,
      { attribution: "© OpenWeatherMap" }
    ).addTo(map);

    return () => {
      map.remove(); // Cleanup on unmount
    };
  }, []);

  return <div id="map" style={{ height: "500px", width: "100%" }} />;
};

export default WeatherMap;
