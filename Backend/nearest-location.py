from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Function to load data from API
def load_data():
    API_endpoint = "http://localhost:8081/user"
    response = requests.get(API_endpoint)
    location_data = response.json()
    df = pd.DataFrame(location_data)
    return df

# Function to prepare the machine learning model
def prepare_model(df):
    scaler = StandardScaler()
    X = df[['lat', 'lng']]
    X_scaled = scaler.fit_transform(X)
    y = df['id']  # Use 'id' for prediction target

    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.4, random_state=42)

    knn = KNeighborsClassifier(n_neighbors=3)
    knn.fit(X_train, y_train)

    return scaler, knn

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Load the data and prepare the model
        df = load_data()
        print(df.head())  # Debugging: Print the first few rows of the data
        scaler, knn = prepare_model(df)

        # Get the new location from the request
        new_location = request.json.get('location')
        print(f"Received location: {new_location}")  # Debugging: Print the received location
        
        if not new_location:
            return jsonify({'error': 'No location provided'}), 400
        if len(new_location) != 2:
            return jsonify({'error': 'Location must contain exactly two values'}), 400
        
        # Ensure no NaNs in new_location
        if any(pd.isna(new_location)):
            return jsonify({'error': 'Location contains NaN values'}), 400
        
        # Process the new location
        new_location_scaled = scaler.transform([new_location])
        predicted_id = knn.predict(new_location_scaled)

        return jsonify({'predicted_id': predicted_id[0]})
    except Exception as e:
        print(f"Error occurred: {str(e)}")  # Debugging: Print the error
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
