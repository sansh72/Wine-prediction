from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import numpy as np
import pandas as pd
import joblib
import time
import os

app = Flask(__name__)
CORS(app)

model = joblib.load("Wine.pkl")

@app.route('/predict', methods=['POST'])
def home():
    return render_template('index.html')
    
def predict():
    # Get JSON data from the request
    data = request.get_json()
    arr = np.array([list(data.values())])
    colummns1 = ["fixed acidity","volatile acidity","citric acid","residual sugar","chlorides","free sulfur dioxide","total sulfur dioxide","density","pH","sulphates","alcohol"]
    dataframe= pd.DataFrame(columns=colummns1, data=arr)

    prediction = model.predict(dataframe)

    if prediction[0] == 1:
        result = "Wine is of good quality "
    else:
        result = "Wine isint very good"

    return jsonify({'result': result})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))  # Use the port set by the environment, default to 5000
    app.run(host='0.0.0.0', port=port, debug=True)
