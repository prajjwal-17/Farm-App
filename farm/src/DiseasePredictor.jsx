import React, { useState } from "react";
import Spinner from "./Spinner";
import "./DiseasePredictor.css";

const DiseasePredictor = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState("");

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  // Handle form submission and disease prediction
  const handlePredict = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please upload an image");

    setLoading(true);
    setPrediction("");

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict-disease", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.error) {
        setPrediction(`❌ Error: ${data.error}`);
      } else {
        setPrediction(`🩺 Disease Detected: ${data.predicted_disease}`);
      }
    } catch (error) {
      setPrediction("❌ Error getting prediction");
    }

    setLoading(false);
  };

  return (
    <div className="disease-container">
      {loading && <Spinner />}
      <form onSubmit={handlePredict} className={`form-container ${loading ? "blur" : ""}`}>
        <h2>Disease Prediction</h2>

        <input type="file" accept="image/*" onChange={handleImageChange} required />

        {/* Image Preview */}
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Selected" />
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Predict"}
        </button>
      </form>

      {/* Prediction Result Below the Form */}
      {prediction && (
        <div className={`prediction-result show`}>
          <span className="icon">🔬</span> {prediction}
        </div>
      )}
    </div>
  );
};

export default DiseasePredictor;
