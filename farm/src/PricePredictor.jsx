import React, { useState } from "react";
import Spinner from "./Spinner";
import "./PricePredictor.css";

const PricePredictor = () => {
  const [cropName, setCropName] = useState("");
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setCropName(e.target.value);
  };

  // Handle form submission and price prediction
  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(""); // Clear previous result

    try {
      const response = await fetch("http://127.0.0.1:5000/predict-price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ crop: cropName }),
      });

      const data = await response.json();

      if (data.error) {
        setPrediction(`❌ Error: ${data.error}`);
      } else {
        setPrediction(`₹${data.predicted_price} per unit`); // Display predicted price
      }
    } catch (error) {
      setPrediction("❌ Error getting prediction");
    }

    setLoading(false);
  };

  return (
    <div className="price-container">
      {loading && <Spinner />}
      <form onSubmit={handlePredict} className={`form-container ${loading ? "blur" : ""}`}>
        <h2>Crop Price Prediction</h2>
        
        <input
          type="text"
          name="cropName"
          placeholder="Enter Crop Name"
          value={cropName}
          onChange={handleChange}
          required
        />
        
        <button type="submit" disabled={loading}>
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {/* Prediction Result Below the Form */}
      {prediction && (
        <div className={`prediction-result show`}>
          <span className="icon">📈</span> Predicted Price: {prediction}
        </div>
      )}
    </div>
  );
};

export default PricePredictor;
