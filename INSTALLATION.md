# Installation & Setup
## 1. Clone the Repository
git clone https://github.com/yourusername/npi-survey-predictor.git
cd npi-survey-predictor

## 2. Install Backend Dependencies
Ensure you have Python 3 installed. Then, install the required dependencies:
pip install flask flask-cors pandas scikit-learn

## 3. Place the Dataset
Make sure the dataset (dummy_npi_data.csv) is located in the same directory as app.py.

## 4. Run the Flask Backend
python app.py
By default, the Flask server will run at http://127.0.0.1:5000/.

## 5. Start the Frontend
Simply open index.html in a browser, or use a local server such as:
python -m http.server 8000
Then, access http://localhost:8000/ in your browser.

# Usage
1. Enter a time in HHMM format (e.g., 1330 for 1:30 PM).
2. Click "Get Available Doctors".
3. View the list of doctors available at the selected time.
4. Download the results as a CSV file for further use.

# API Endpoints
GET /predict?time=HHMM
Parameters:
time: The desired time in HHMM format (e.g., 0930 for 9:30 AM).
Response:
Returns a JSON object containing a list of available doctors (NPIs), their state, specialty, and region.
Example:
{
  "doctors": [
    {
      "NPI": "1000000005",
      "State": "IL",
      "Speciality": "Orthopedics",
      "Region": "Midwest"
    },
    {
      "NPI": "1000000011",
      "State": "IL",
      "Speciality": "General Practice",
      "Region": "Midwest"
    },
  ]
  "input_time": "1337"
}
