from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from auth import router as auth_router
from crud import save_bookmark, get_bookmarks, delete_bookmark
from database import Base, engine, SessionLocal

app = FastAPI()

# Enable CORS for frontend (adjust for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB schema creation
Base.metadata.create_all(bind=engine)

# Include auth routes
app.include_router(auth_router)

# Security dependency
bearer_scheme = HTTPBearer()

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "Link Saver backend is running 🎉"}

# 🔖 Add a bookmark
@app.post("/bookmark")
async def add_bookmark(
    url: str,
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db=Depends(get_db)
):
    token = credentials.credentials
    return await save_bookmark(url, token, db)

# 📚 Get bookmarks
@app.get("/bookmarks")
def list_bookmarks(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db=Depends(get_db)
):
    token = credentials.credentials
    return get_bookmarks(token, db)

# ❌ Delete bookmark
@app.delete("/bookmark/{bookmark_id}")
def remove_bookmark(
    bookmark_id: int,
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db=Depends(get_db)
):
    token = credentials.credentials
    return delete_bookmark(bookmark_id, token, db)
