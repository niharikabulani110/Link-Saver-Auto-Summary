# 🔖 Link Saver

A full-stack web app to save, summarize, and manage bookmarks using AI.

Users can sign up, log in, and paste any URL. The app fetches metadata, auto-generates a summary using Jina AI, and displays it in a clean interface with edit/delete functionality.

---

## ✨ Features

### ✅ Core
- 🔐 JWT-based Signup/Login
- 📎 Save any URL with one click
- 🧠 AI Summary from [Jina AI](https://r.jina.ai)
- 🖼️ Metadata extraction: title + favicon
- 📋 View, edit & delete bookmarks
- 🌓 Dark mode toggle
- ⚡ Responsive & clean UI

---

## ⚙️ Tech Stack

### Frontend:
- React + Vite
- Tailwind CSS
- Axios
- React Router
- React Markdown (for summaries)

### Backend:
- FastAPI
- SQLite + SQLAlchemy
- JWT (via python-jose)
- Passlib (bcrypt hashing)
- Jina AI for summaries
- httpx for web requests

---

## 🚀 Getting Started

### 📦 Clone the repo
```bash
git clone https://github.com/niharikabulani110/Link-Saver-Auto-Summary.git
cd Link-Saver-Auto-Summary
```

---

### 🖥️ Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate     # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```
- Runs on `http://localhost:8000`

---

### 🌐 Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
- Runs on `http://localhost:5173`

---

## 🔐 Auth Flow
- Signup/Login stores JWT in localStorage
- Axios auto-sends token with each request
- Backend protects routes via bearer token

---

## 📸 Screenshots
| Dashboard Example |
|-------------------|
| ![Screenshot](./screenshots/dashboard.png) |

> Replace with your own screenshot from the running app.

---

## 🧪 Run Backend Tests
```bash
cd backend
pytest tests/
```

---

## 📁 Project Structure
```
Link-Saver-Auto-Summary/
├── backend/
│   ├── main.py, auth.py, crud.py, models.py, database.py
│   ├── tests/ (pytest-based)
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── api/, components/, pages/, utils/
│   │   └── App.jsx, main.jsx, index.css
│   └── vite.config.js, tailwind.config.js
└── README.md
```

---

## 🔗 Test URLs for Summaries
Paste these into the app:
- https://en.wikipedia.org/wiki/OpenAI
- https://arxiv.org/abs/2303.08774
- https://developer.mozilla.org/en-US/docs/Web/JavaScript

---

## 📜 License
MIT

---

## 🙌 Credits
- [Jina AI](https://r.jina.ai) for summarization
- [FastAPI](https://fastapi.tiangolo.com/)
- [Tailwind CSS](https://tailwindcss.com/)
