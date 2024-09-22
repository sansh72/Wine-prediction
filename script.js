document.getElementById('WinePrediction').addEventListener('submit', function (event) {
    event.preventDefault();

    // Collect input values from the form
    const data = {
        "fixed acidity": parseFloat(document.getElementById('fixed_acidity').value),
        "volatile acidity": parseFloat(document.getElementById('volatile_acidity').value),
        "citric acid": parseFloat(document.getElementById('citric_acid').value),
        "residual sugar": parseFloat(document.getElementById('residual_sugar').value),
        "chlorides": parseFloat(document.getElementById('chlorides').value),
        "free sulfur dioxide": parseFloat(document.getElementById('free_sulfur_dioxide').value),
        "total sulfur dioxide": parseFloat(document.getElementById('total_sulfur_dioxide').value),
        "density": parseFloat(document.getElementById('density').value),
        "pH": parseFloat(document.getElementById('ph').value),
        "sulphates": parseFloat(document.getElementById('sulphates').value),
        "alcohol": parseFloat(document.getElementById('alcohol').value)
    };

    // Make a POST request to the Flask API
    fetch('http://127.0.0.1:5000/predict', {  // Update the URL if Flask runs on a different host
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)  // Send data as a JSON string
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        console.log('Success:', result);

        // Display the prediction result on the webpage
        const resultElement = document.getElementById('result');
        resultElement.innerText = result.result;

        // Show the result for 3 minutes (180,000 milliseconds), then clear it
        setTimeout(() => {
            resultElement.innerText = '';
        }, 180000);  // 180000 ms = 3 minutes
    })
    .catch((error) => {
        console.error('Error:', error);

        // Display the error message to the user
        const resultElement = document.getElementById('result');
        resultElement.innerText = 'An error occurred while predicting. Please try again.';

        // Hide the error message after 3 minutes
        setTimeout(() => {
            resultElement.innerText = '';
        }, 180000);  // 180000 ms = 3 minutes
    });
});
