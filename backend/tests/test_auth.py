import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_signup_and_login():
    user_data = {
        "email": "testuser@example.com",
        "password": "securepass123"
    }

    # Signup
    signup_response = client.post("/signup", json=user_data)
    assert signup_response.status_code in (200, 400)

    # Login
    login_response = client.post("/login", json=user_data)
    assert login_response.status_code == 200
    assert "access_token" in login_response.json()
