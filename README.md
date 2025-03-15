# npi-survey-predictor
A machine learning-powered web application that predicts the best doctors (NPIs) to invite for surveys based on their activity patterns. Users can input a time, and the app generates an optimized list of doctors likely to attend, downloadable as a CSV.
# 1️⃣ Project Title
NPI Survey Predictor

# 2️⃣ Overview
This web application helps predict the best doctors (NPIs) to invite for a survey based on their past login/logout activity. Instead of sending survey emails to all doctors, this tool filters and selects those most likely to be available at a given time.

# 3️⃣ Features
✅ Input a time (HHMM format) and get a list of available doctors.
✅ Uses past login/logout activity for prediction.
✅ CSV-based data processing for flexibility.
✅ REST API endpoint (/predict) to fetch doctor availability.
✅ Download results as a CSV file for further analysis.
✅ Stylish and responsive frontend using HTML, CSS, and JavaScript.

# 4️⃣ Tech Stack
Backend: Flask (Python)
Frontend: HTML, CSS, JavaScript
Data Processing: Pandas
Machine Learning: Label Encoding (for Availability)
