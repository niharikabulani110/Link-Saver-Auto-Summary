# Link Saver

A full-stack application for saving and organizing your favorite links.

## Project Structure

```
link-saver/
├── backend/         # FastAPI backend
│   ├── main.py     # Main application entry point
│   ├── models.py   # Database models
│   ├── database.py # Database configuration
│   ├── auth.py     # Authentication logic
│   ├── crud.py     # CRUD operations
│   └── requirements.txt
├── frontend/       # React frontend
└── README.md
```

## Setup

### Backend
1. Navigate to the backend directory
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Unix/MacOS: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Run the server: `uvicorn main:app --reload`

### Frontend
1. Navigate to the frontend directory
2. Install dependencies: `npm install`
3. Start the development server: `npm start` 