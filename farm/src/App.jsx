import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Products from "./Products";
import Visualization from "./Visualization";
import "./App.css";
import PricePredictor from "./PricePredictor";
import DiseasePredictor from "./DiseasePredictor";

const WeatherPage = () => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${state}&appid=f1b61de0287ce77fa1f9f1073a0a0894&units=metric`
      );
      const data = await response.json();
      if (data.cod !== 200) {
        setError("City not found. Please enter a valid location.");
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (error) {
      setError("Error fetching weather data.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-container">
      <div className="content">
        <h1>Weather Information</h1>
        <p>Enter a city and state to get real-time weather updates.</p>

        <div className="input-container">
          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
            <br />
          <button className="weather-btn" onClick={fetchWeather} disabled={loading}>
            {loading ? "Fetching..." : "Get Weather"}
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {weather && (
          <div className="weather-info">
            <h2>{weather.name}</h2>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Condition: {weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Home = () => (
  <div className="bg-container">
    <div className="content">
      <h1>Grow More, Worry Less with Our Farm Assistant</h1>
      <p>
        Unlock the power of real-time insights for your farm’s success.
        From weather alerts to disease detection — we help you thrive every season.
      </p>
      <div className="buttons">
        <button className="learn-more">Learn More →</button>
        <Link to="/weather">
          <button className="weather-btn">Check Weather</button>
        </Link>
      </div>
    </div>
  </div>
);

const Contact = () => <h1 className="page-container">Contact Page</h1>;

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Disease" element={<DiseasePredictor />} />
          <Route path="/predictor" element={<PricePredictor />} />
          <Route path="/visualization" element={<Visualization />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/weather" element={<WeatherPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
