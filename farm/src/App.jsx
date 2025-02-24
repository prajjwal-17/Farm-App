import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Products from "./Products"; // Import Products
import Visualization from "./Visualization"; // Import Visualization
import "./App.css";
import PricePredictor from "./PricePredictor";

const Home = () => (
  <div className="bg-container">
    <div className="content">
      <h1>Grow More, Worry Less with Our Farm Assistant</h1>
      <p>Unlock the power of real-time insights for your farm’s success.
      From weather alerts to disease detection — we help you thrive every season</p>
      <div className="buttons">
        <button className="learn-more">Learn More →</button>
        <button className="contact-us">Contact Us</button>
      </div>
    </div>
  </div>
);

const About = () => <h1 className="page-container">About Page</h1>;
const Contact = () => <h1 className="page-container">Contact Page</h1>;

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/predictor" element={<PricePredictor />} />
          <Route path="/visualization" element={<Visualization />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
