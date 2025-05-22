from fastapi import HTTPException
from sqlalchemy.orm import Session
from jose import jwt, JWTError, ExpiredSignatureError
import httpx

from models import Bookmark
from config import SECRET_KEY, ALGORITHM

def get_user_id_from_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return int(payload["sub"])
    except ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def fetch_metadata(url: str):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, timeout=5)
            response.raise_for_status()
            title = response.text.split("<title>")[1].split("</title>")[0]
            favicon = url + "/favicon.ico"
            return title, favicon
    except Exception:
        return "No Title", url + "/favicon.ico"

async def fetch_summary(url: str):
    try:
        async with httpx.AsyncClient() as client:
            target = httpx.utils.quote(url, safe="")
            response = await client.get(f"https://r.jina.ai/http://{target}", timeout=5)
            response.raise_for_status()
            return response.text.strip()
    except Exception:
        return "Summary temporarily unavailable."

async def save_bookmark(url: str, token: str, db: Session):
    user_id = get_user_id_from_token(token)
    title, favicon = await fetch_metadata(url)
    summary = await fetch_summary(url)

    bookmark = Bookmark(
        url=url,
        title=title,
        favicon=favicon,
        summary=summary,
        user_id=user_id
    )
    db.add(bookmark)
    db.commit()
    db.refresh(bookmark)  # Ensure ID is loaded

    return {
        "id": bookmark.id,
        "url": bookmark.url,
        "title": bookmark.title,
        "favicon": bookmark.favicon,
        "summary": bookmark.summary,
    }

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
    return {"msg": "Bookmark deleted"}
