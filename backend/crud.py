from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from jose import jwt, JWTError
from models import Bookmark
import httpx
from auth import SECRET_KEY, ALGORITHM

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_user_id_from_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return int(payload["sub"])
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def fetch_metadata(url: str):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            title = response.text.split("<title>")[1].split("</title>")[0]
            favicon = url + "/favicon.ico"
            return title, favicon
    except:
        return "No Title", url + "/favicon.ico"

async def fetch_summary(url: str):
    try:
        async with httpx.AsyncClient() as client:
            target = httpx.utils.quote(url, safe="")
            response = await client.get(f"https://r.jina.ai/http://{target}")
            return response.text
    except:
        return "Summary temporarily unavailable."

async def save_bookmark(url: str, token: str, db: Session):
    user_id = get_user_id_from_token(token)
    title, favicon = await fetch_metadata(url)
    summary = await fetch_summary(url)
    bookmark = Bookmark(url=url, title=title, favicon=favicon, summary=summary, user_id=user_id)
    db.add(bookmark)
    db.commit()
    return bookmark

def get_bookmarks(token: str, db: Session):
    user_id = get_user_id_from_token(token)
    return db.query(Bookmark).filter(Bookmark.user_id == user_id).all()

def delete_bookmark(bookmark_id: int, token: str, db: Session):
    user_id = get_user_id_from_token(token)
    bookmark = db.query(Bookmark).filter(Bookmark.id == bookmark_id, Bookmark.user_id == user_id).first()
    if not bookmark:
        raise HTTPException(status_code=404, detail="Bookmark not found")
    db.delete(bookmark)
    db.commit()
