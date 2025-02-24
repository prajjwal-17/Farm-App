import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import CSS for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo - Clicking on it redirects to Home */}
        <Link to="/" className="logo">
          <img src="/Farma3.png" alt="Logo" />
        </Link>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/predictor">Price Predictor</Link></li>
          <li><Link to="/visualization">Visualization</Link></li>
          <li><Link to="/products">Crop Detector</Link></li>
        </ul>

        {/* Contact Button */}
        <Link to="/contact" className="contact-btn">Contact Us →</Link>
      </div>
    </nav>
  );
};

export default Navbar;
