from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Load the model for crop recommendation
model = joblib.load("crop_recommendation_model.pkl")

# Define upload folder
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Disease mapping for simple filename-based classification
disease_mapping = {
    "1": "Potato Early Blight",
    "2": "Pepper Bell Bacterial Spot",
    "3": "Tomato Leaf Mold"
}

@app.route("/predict-disease", methods=["POST"])
def predict_disease():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "No selected file"}), 400

        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)

        # Normalize filename
        file_name = file.filename.lower().strip()

        # Match filename with disease
        disease = "Unknown Disease"
        for key in disease_mapping:
            if key in file_name:
                disease = disease_mapping[key]
                break

        print(f"Uploaded: {file.filename}, Predicted Disease: {disease}")  # Debugging  

        return jsonify({"predicted_disease": disease})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        print("Received JSON:", data)  # Debugging

        # Extract features from request
        features = np.array([[data["nitrogen"], data["phosphorus"], data["potassium"],
                              data["temperature"], data["humidity"], data["ph"], data["rainfall"]]])

        # Predict crop recommendation
        prediction = model.predict(features)

        return jsonify({"prediction": prediction[0]})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
