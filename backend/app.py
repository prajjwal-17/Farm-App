from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Load model
model = joblib.load("crop_recommendation_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        print("Received JSON:", data)  # Debugging

        # Extract features from request
        features = np.array([[data["nitrogen"], data["phosphorus"], data["potassium"],
                              data["temperature"], data["humidity"], data["ph"], data["rainfall"]]])

        # Predict
        prediction = model.predict(features)

        return jsonify({"prediction": prediction[0]})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
