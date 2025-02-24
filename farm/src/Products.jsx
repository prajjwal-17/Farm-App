import React, { useState } from "react";
import Spinner from "./Spinner";
import "./Products.css";

const Products = () => {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission and prediction
  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(""); // Clear previous result

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.error) {
        setPrediction(`❌ Error: ${data.error}`);
      } else {
        setPrediction(data.prediction); // Store only the crop name
      }
    } catch (error) {
      setPrediction("❌ Error getting prediction");
    }

    setLoading(false);
  };

  return (
    <div className="products-container">
      {loading && <Spinner />}
      <form onSubmit={handlePredict} className={`form-container ${loading ? "blur" : ""}`}>
        <h2>Crop Recommendation</h2>
        
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            type="number"
            name={key}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            value={formData[key]}
            onChange={handleChange}
            required
          />
        ))}
        
        <button type="submit" disabled={loading}>
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {/* Prediction Result Below the Form */}
      {prediction && (
        <div className={`prediction-result show`}>
          <span className="icon">✅</span> Recommended Crop: {prediction}
        </div>
      )}
    </div>
  );
};

export default Products;
