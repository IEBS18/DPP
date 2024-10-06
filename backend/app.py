# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import uuid
# import json
# import os
# from werkzeug.security import generate_password_hash, check_password_hash

# app = Flask(__name__)
# CORS(app)

# #authentication
# USERS_FILE = 'users.json'

# def load_users():
#     try:
#         with open('users.json', 'r') as f:
#             return json.load(f)
#     except FileNotFoundError:
#         return {}

# # Save users to a file
# def save_users(users):
#     with open('users.json', 'w') as f:
#         json.dump(users, f)

# @app.route('/signup', methods=['POST'])
# def signup():
#     data = request.get_json()
#     username = data['email']  # Assuming 'email' is sent from the frontend
#     password = data['password']
#     first_name = data['firstName']  # Get firstName from the frontend
#     last_name = data['lastName']    # Get lastName from the frontend

#     users = load_users()

#     if username in users:
#         return jsonify({'message': 'User already exists'}), 400

#     # Generate a unique user_id
#     user_id = str(uuid.uuid4())

#     # Hash the password before storing it
#     hashed_password = generate_password_hash(password)

#     # Store user with user_id, hashed password, firstName, and lastName
#     users[username] = {
#         'user_id': user_id,
#         'first_name': first_name,
#         'last_name': last_name,
#         'password': hashed_password
#     }
    
#     save_users(users)

#     return jsonify({'message': 'User created successfully', 'user_id': user_id, 'first_name': first_name}), 201

# @app.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     username = data['email']
#     password = data['password']

#     users = load_users()

#     if username not in users:
#         return jsonify({'message': 'User does not exist'}), 401

#     # Check if the provided password matches the stored hashed password
#     if not check_password_hash(users[username]['password'], password):
#         return jsonify({'message': 'Invalid credentials'}), 401

#     # Return the user_id and first_name along with a success message
#     return jsonify({
#         'message': 'Login successful', 
#         'user_id': users[username]['user_id'], 
#         'first_name': users[username]['first_name']
#     }), 200
    
# @app.route('/visualize', methods=['POST'])
# def visualize():
#     data = request.get_json()
#     target_disease = data.get('disease')
#     # logic to visualize the data

# @app.route('/predict', methods=['POST'])
# def predict():
#     data = request.get_json()
#     target_disease = data.get('disease')
#     # logic to predict the data

    
# if __name__ == '__main__':
#     app.run(debug=True)


from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import uuid
import json
import os
from werkzeug.security import generate_password_hash, check_password_hash
import warnings
from embeddings.data_processing import load_data, preprocess_data
from models.query_analyzer import MainLLM
from models.sub_llm import SubLLM
from models.rag import RAG
from models.response_aggregator import ResponseAggregator
from models.drug_visualizer import DrugVisualizer  # For visualization
from models.new_drug_price import NewDrugPricePredictor  # For new drug price prediction
from models.rag import RAG
import pandas as pd

app = Flask(__name__)
CORS(app)

warnings.filterwarnings("ignore", category=UserWarning)

# Authentication
USERS_FILE = 'users.json'

def load_users():
    try:
        with open('users.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return {}

def save_users(users):
    with open('users.json', 'w') as f:
        json.dump(users, f)

# Load data and initialize models
data_path = 'data/price_prediction.csv'
historical_data_path = 'data/price_prediction.csv'
data = load_data(data_path)
preprocessed_data = preprocess_data(data)

# Initialize ML models
main_llm = MainLLM()
rag = RAG(historical_data_path)
sub_llm = SubLLM(preprocessed_data)
drug_visualizer = DrugVisualizer(preprocessed_data, rag)
new_drug_predictor = NewDrugPricePredictor(preprocessed_data, rag, sub_llm)



@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data['email']
    password = data['password']
    first_name = data['firstName']
    last_name = data['lastName']

    users = load_users()

    if username in users:
        return jsonify({'message': 'User already exists'}), 400

    user_id = str(uuid.uuid4())
    hashed_password = generate_password_hash(password)
    users[username] = {
        'user_id': user_id,
        'first_name': first_name,
        'last_name': last_name,
        'password': hashed_password
    }
    save_users(users)

    return jsonify({'message': 'User created successfully', 'user_id': user_id, 'first_name': first_name}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['email']
    password = data['password']

    users = load_users()

    if username not in users:
        return jsonify({'message': 'User does not exist'}), 401

    if not check_password_hash(users[username]['password'], password):
        return jsonify({'message': 'Invalid credentials'}), 401

    return jsonify({
        'message': 'Login successful', 
        'user_id': users[username]['user_id'], 
        'first_name': users[username]['first_name']
    }), 200

# @app.route('/visualize', methods=['POST'])
# def visualize():
#     data = request.get_json()
#     drug_name = data.get('drug_name')

#     if not drug_name:
#         return jsonify({'error': 'Drug name is required'}), 400

#     try:
#         # Use the drug visualizer to visualize the requested drug data
#         visualization_result = drug_visualizer.visualize_drug_data(drug_name)
#         return jsonify({'message': f"Visualization for {drug_name} completed", 'data': visualization_result}), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500


# @app.route('/visualize', methods=['POST'])
# def visualize():
#     data = request.get_json()
#     drug_name = data.get('drug_name')

#     if not drug_name:
#         return jsonify({'error': 'Drug name is required'}), 400

#     try:
#         # Use the drug visualizer to retrieve the requested drug data
#         visualization_result = drug_visualizer.visualize_drug_data(drug_name)
#         return jsonify({'message': f"Visualization for {drug_name} completed", 'data': visualization_result}), 200
#     except ValueError as e:
#         return jsonify({'error': str(e)}), 404
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500
@app.route('/visualize', methods=['POST'])
def visualize():
    data = request.get_json()
    drug_name = data.get('drug_name')

    if not drug_name:
        return jsonify({'error': 'Drug name is required'}), 400

    try:
        # Use the drug visualizer to generate the graph
        img = drug_visualizer.visualize_drug_data(drug_name)

        # Return the image as a response
        return send_file(img, mimetype='image/png')
    except ValueError as e:
        return jsonify({'error': str(e)}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# @app.route('/predict', methods=['POST'])
# def predict():
#     data = request.get_json()

#     # Validate input
#     required_fields = [
#         'Drug_Name', 'disease', 'Benefit_Assessment', 'mortality', 'morbidity', 
#         'quality_of_life', 'Side_Effects', 'Total_Adverse_Events', 
#         'Adverse_Event_Discontinuation', 'Combination_Therapy', 'Serious_Adverse_Events'
#     ]

#     for field in required_fields:
#         if field not in data:
#             return jsonify({'error': f'{field} is required'}), 400

#     # Call the ML model to predict the price of the new drug
#     try:
#         predicted_cost = new_drug_predictor.predict_new_drug_price(data)
#         return jsonify({'predicted_cost': f"₹{predicted_cost:.2f}"}), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# @app.route('/predict', methods=['POST'])
# def predict():
#     data = request.get_json()

#     # Validate input
#     required_fields = [
#         'Drug_Name', 'disease', 'Benefit_Assessment', 'mortality', 'morbidity', 
#         'quality_of_life', 'Side_Effects', 'Total_Adverse_Events', 
#         'Adverse_Event_Discontinuation', 'Combination_Therapy', 'Serious_Adverse_Events'
#     ]

#     for field in required_fields:
#         if field not in data:
#             return jsonify({'error': f'{field} is required'}), 400

#     # Convert numeric fields to proper types
#     try:
#         data['mortality'] = float(data['mortality'])
#         data['morbidity'] = float(data['morbidity'])
#         data['quality_of_life'] = float(data['quality_of_life'])
#         data['Total_Adverse_Events'] = float(data['Total_Adverse_Events'])
#         data['Adverse_Event_Discontinuation'] = float(data['Adverse_Event_Discontinuation'])
#         data['Serious_Adverse_Events'] = float(data['Serious_Adverse_Events'])
#     except ValueError:
#         return jsonify({'error': 'Invalid input: numerical fields must be numbers'}), 400

#     # Call the ML model to predict the price of the new drug
#     try:
#         predicted_cost = new_drug_predictor.predict_new_drug_price(data)
#         return jsonify({'predicted_cost': f"₹{predicted_cost:.2f}"}), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    # Validate input
    required_fields = [
        'Drug_Name', 'disease', 'Benefit_Assessment', 'mortality', 'morbidity', 
        'quality_of_life', 'Side_Effects', 'Total_Adverse_Events', 
        'Adverse_Event_Discontinuation', 'Combination_Therapy', 'Serious_Adverse_Events'
    ]

    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'{field} is required'}), 400

    # Convert numeric fields to proper types
    try:
        data['mortality'] = float(data['mortality'])
        data['morbidity'] = float(data['morbidity'])
        data['quality_of_life'] = float(data['quality_of_life'])
        data['Total_Adverse_Events'] = float(data['Total_Adverse_Events'])
        data['Adverse_Event_Discontinuation'] = float(data['Adverse_Event_Discontinuation'])
        data['Serious_Adverse_Events'] = float(data['Serious_Adverse_Events'])
    except ValueError:
        return jsonify({'error': 'Invalid input: numerical fields must be numbers'}), 400

    # Call the ML model to predict the price of the new drug
    try:
        new_drug_predictor = NewDrugPricePredictor(preprocessed_data, rag, sub_llm)
        disease_keywords = data['disease'].split()
        disease_drugs = new_drug_predictor.df[new_drug_predictor.df['Indication'].apply(
            lambda x: all(keyword.lower() in str(x).lower() for keyword in disease_keywords)
        )].copy()
        print(data)
        adjusted_cost = new_drug_predictor.predict_new_drug_price(data)
        # predicted_price = rag.get_current_price(data['Drug_Name'])
        # print("adjusted cost: ",predicted_price)

        # Store the image temporarily if needed for retrieval
        img_path = f"static/comparator_drug_prices_{data['Drug_Name']}.png"  # Adjust path as necessary
        img = new_drug_predictor.visualize_comparator_drug_prices(disease_drugs, adjusted_cost, data['Drug_Name'])
        # img_path = f"{base_path}/comparator_drug_prices_{drug_name}.png"
        n = 1
        while os.path.exists(img_path):
            img_path = f"static/comparator_drug_prices_{data['Drug_Name']}_{n}.png"
            n += 1
  
        with open(img_path, 'wb') as f:
            f.write(img.getvalue())

        return jsonify({
            'predicted_price': f"€{adjusted_cost:.2f}",
            'image_url': f"/static/{img_path.split('/')[-1]}"  # Return the URL of the image
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
