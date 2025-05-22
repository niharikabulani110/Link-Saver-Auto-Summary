from fastapi.testclient import TestClient
import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from main import app

client = TestClient(app)

def test_bookmark_flow():
    user_data = {
        "email": "bookmarker@example.com",
        "password": "bookpass"
    }

    # Signup
    client.post("/signup", json=user_data)

    # Login
    login_response = client.post("/login", json=user_data)
    assert login_response.status_code == 200
    token = login_response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Add bookmark
    test_url = "https://en.wikipedia.org/wiki/OpenAI"
    add_response = client.post("/bookmark", params={"url": test_url}, headers=headers)
    assert add_response.status_code == 200
    assert "title" in add_response.json()

    # List bookmarks
    list_response = client.get("/bookmarks", headers=headers)
    assert list_response.status_code == 200
    bookmarks = list_response.json()
    assert any(b["url"] == test_url for b in bookmarks)

    # Delete bookmark
    bookmark_id = bookmarks[0]["id"]
    delete_response = client.delete(f"/bookmark/{bookmark_id}", headers=headers)
    assert delete_response.status_code == 200
