

from embeddings.data_processing import load_data, preprocess_data
from models.query_analyzer import MainLLM
from models.sub_llm import SubLLM
from models.rag import RAG
from models.response_aggregator import ResponseAggregator
from models.drug_visualizer import DrugVisualizer  # For visualization
from models.new_drug_price import NewDrugPricePredictor  # For new drug price prediction
import warnings

warnings.filterwarnings("ignore", category=UserWarning)

# Load data
data_path = 'data/price_prediction.csv'
historical_data_path = 'data/price_prediction.csv'
data = load_data(data_path)
preprocessed_data = preprocess_data(data)

# Initialize
main_llm = MainLLM()
rag = RAG(historical_data_path)
sub_llm = SubLLM(preprocessed_data) 
drug_visualizer = DrugVisualizer(preprocessed_data, rag) 
new_drug_predictor = NewDrugPricePredictor(preprocessed_data, rag, sub_llm)  

# User options
print("Welcome to the Drug Cost Prediction System.")
print("1. Visualize existing drug data.")
print("2. Predict the cost of a new drug entering the market.")
choice = input("Please enter your choice (1/2): ")

if choice == '1':
    drug_name = input("Enter the name of the drug you want to visualize: ")
    
    drug_visualizer.visualize_drug_data(drug_name)

elif choice == '2':
    # inputs for the new drug data
    new_drug_data = {
        'Drug_Name': input("Enter the new drug's name: "),
        'disease': input("Enter the disease the new drug is treating: "),
        'Benefit_Assessment': input("Enter the benefit assessment for the new drug: "),
        'mortality': float(input("Enter the mortality rate of the new drug: ")),
        'morbidity': float(input("Enter the morbidity (PFS) rate of the new drug: ")),
        'quality_of_life': float(input("Enter the quality of life improvement of the new drug: ")),
        'Side_Effects': input("Enter the side effects for the new drug: "),
        'Total_Adverse_Events': float(input("Enter the total adverse events rate for the new drug: ")),
        'Adverse_Event_Discontinuation': float(input("Enter the adverse event discontinuation rate for the new drug: ")),
        'Combination_Therapy': input("Is the new drug a combination therapy? (Yes/No): "),
        'Serious_Adverse_Events': float(input("Enter the serious adverse events rate for the new drug: "))
    }

    predicted_cost = new_drug_predictor.predict_new_drug_price(new_drug_data)
    
    print(f"Predicted cost for the new drug: ₹{predicted_cost:.2f}")

else:
    print("Invalid choice. Please select 1 or 2.")
