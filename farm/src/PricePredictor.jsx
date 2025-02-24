import React, { useState } from "react";
import Spinner from "./Spinner";
import "./PricePredictor.css";

const PricePredictor = () => {
  const [commodity, setCommodity] = useState("");
  const [district, setDistrict] = useState("");
  const [market, setMarket] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [modalPrice, setModalPrice] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [grade, setGrade] = useState("");

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState("");

  // Handle input change
  const handleChange = (e, setter) => {
    setter(e.target.value);
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
        body: JSON.stringify({
          commodity,
          district,
          market,
          min_price: parseFloat(minPrice),
          max_price: parseFloat(maxPrice),
          modal_price: parseFloat(modalPrice),
          arrival_date: arrivalDate,
          grade,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setPrediction(`❌ Error: ${data.error}`);
      } else {
        setPrediction(`₹${data.predicted_price} per unit`);
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
        
        <input type="text" placeholder="Commodity" value={commodity} onChange={(e) => handleChange(e, setCommodity)} required />
        <input type="text" placeholder="District" value={district} onChange={(e) => handleChange(e, setDistrict)} required />
        <input type="text" placeholder="Market" value={market} onChange={(e) => handleChange(e, setMarket)} required />
        <input type="number" placeholder="Min Price" value={minPrice} onChange={(e) => handleChange(e, setMinPrice)} required />
        <input type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => handleChange(e, setMaxPrice)} required />
        <input type="number" placeholder="Modal Price" value={modalPrice} onChange={(e) => handleChange(e, setModalPrice)} required />
        <input type="text" placeholder="Arrival Date (YYYY-MM-DD)" value={arrivalDate} onChange={(e) => handleChange(e, setArrivalDate)} required />
        <input type="text" placeholder="Grade" value={grade} onChange={(e) => handleChange(e, setGrade)} required />

        <button type="submit" disabled={loading}>
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {/* Prediction Result */}
      {prediction && (
        <div className={`prediction-result show`}>
          <span className="icon">📈</span> Predicted Price: {prediction}
        </div>
      )}
    </div>
  );
};

export default PricePredictor;
