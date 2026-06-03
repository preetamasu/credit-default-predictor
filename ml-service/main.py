from fastapi import FastAPI
import joblib
import numpy as np
from pydantic import BaseModel

model = joblib.load("credit_default_rf_model.pkl")

app = FastAPI(title= "Credit Default Predictor")

class CreditApplicationInput(BaseModel):
    person_age: int
    person_income: float
    person_emp_length: float
    loan_grade: int
    loan_amnt: float
    loan_int_rate: float
    loan_percent_income: float
    cb_person_default_on_file: int
    cb_person_cred_hist_length: int
    person_home_ownership: str
    loan_intent: str

@app.get("/")
def credit():
    return {"message":"Welcome to the Credit Default Prediction using ML"}

@app.post("/predict")
def predict_price(data: CreditApplicationInput):
    features = np.array([[
        data.person_age,
        data.person_income,
        data.person_emp_length,
        data.loan_grade,
        data.loan_amnt,
        data.loan_int_rate,
        data.loan_percent_income,
        data.cb_person_default_on_file,
        data.cb_person_cred_hist_length,
    1 if data.person_home_ownership == "OTHER" else 0,
    1 if data.person_home_ownership == "OWN" else 0,
    1 if data.person_home_ownership == "RENT" else 0,
    1 if data.loan_intent == "EDUCATION" else 0,
    1 if data.loan_intent == "HOMEIMPROVEMENT" else 0,
    1 if data.loan_intent == "MEDICAL" else 0,
    1 if data.loan_intent == "PERSONAL" else 0,
    1 if data.loan_intent == "VENTURE" else 0

    
    ]])

    prediction = model.predict(features)
    default_probability = model.predict_proba(features)[0][1]

    return {"prediction": int(prediction[0]),
            "prediction_label": "DEFAULT_LIKELY" if prediction[0]==1 else "DEFAULT_UNLIKELY",
            "defaultProbability": float(default_probability),
             "modelVersion": "credit-default-rf-v1"
            
            }
