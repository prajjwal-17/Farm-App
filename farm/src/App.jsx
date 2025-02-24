import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Products from "./Products"; // Import Products
import "./App.css";

const Home = () => (
  <div className="bg-container">
    <div className="content">
      <h1>Organic food from the ground to your table</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <div className="buttons">
        <button className="learn-more">Learn More →</button>
        <button className="contact-us">Contact Us</button>
      </div>
    </div>
  </div>
);

const About = () => <h1 className="page-container">About Page</h1>;
const Blog = () => <h1 className="page-container">Blog Page</h1>;
const Visualization = () => <h1 className="page-container">Visualization</h1>;
const Contact = () => <h1 className="page-container">Contact Page</h1>;

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/visualization" element={<Visualization />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
