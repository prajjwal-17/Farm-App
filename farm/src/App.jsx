import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
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

const About = () => <h1>About Page</h1>;
const Blog = () => <h1>Blog Page</h1>;
const Reviews = () => <h1>Reviews Page</h1>;
const Products = () => <h1>Products Page</h1>;
const Contact = () => <h1>Contact Page</h1>;

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
