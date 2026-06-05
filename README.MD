# Credit Default Predictor

A full-stack credit default prediction platform that allows users to create customers, submit credit applications, and run machine-learning based default risk predictions.

The system uses a Spring Boot backend, PostgreSQL database, FastAPI ML service, scikit-learn Random Forest model, and a React frontend.

## Live Demo

Frontend: `PASTE_VERCEL_URL_HERE`  
Backend: `PASTE_RAILWAY_URL_HERE`  
ML Service: `PASTE_RENDER_URL_HERE`

## Tech Stack

### Backend
- Java
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Jakarta Validation
- RestClient
- Maven

### Machine Learning
- Python
- FastAPI
- scikit-learn
- pandas
- NumPy
- joblib
- Random Forest Classifier

### Frontend
- React
- Vite
- Tailwind CSS
- Axios

### Deployment
- Frontend: Vercel
- Backend: Railway
- ML Service: Render
- Database: Neon PostgreSQL

## Architecture

```text
React Frontend
      |
      v
Spring Boot Backend
      |
      |---- PostgreSQL / Neon
      |
      v
FastAPI ML Service
      |
      v
scikit-learn Random Forest Model