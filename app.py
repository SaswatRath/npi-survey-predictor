from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from datetime import datetime, time

app = Flask(__name__)
CORS(app)

csv_file = "C:\\Users\\saswa\\OneDrive\\Desktop\\Testing 2\\dummy_npi_data.csv"

def load_data():
    """Loads the CSV data and converts time columns."""
    df = pd.read_csv(csv_file)
    df['Login Time'] = pd.to_datetime(df['Login Time']).dt.time
    df['Logout Time'] = pd.to_datetime(df['Logout Time']).dt.time
    return df

le = LabelEncoder()

@app.route('/predict', methods=['GET'])
def predict():
    try:
        time_str = request.args.get('time')
        hour = int(time_str[:2])
        minute = int(time_str[2:])
        input_time = time(hour, minute)

        df = load_data()

        if 'Availability' in df.columns:
            df['Availability'] = le.fit_transform(df['Availability'])

        available_doctors = df[(df['Login Time'] <= input_time) & (df['Logout Time'] >= input_time)]

        if available_doctors.empty:
            return jsonify({'message': 'No available doctors found', 'doctors': [], 'input_time': time_str})

        doctor_list = available_doctors[['NPI', 'State', 'Speciality', 'Region']].to_dict(orient='records')
        return jsonify({'message': 'Success', 'doctors': doctor_list, 'input_time': time_str})

    except ValueError:
        return jsonify({'error': 'Invalid time format. Please use HHMM (e.g., 1330)'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)