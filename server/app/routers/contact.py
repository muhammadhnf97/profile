from fastapi import APIRouter, status

from app.db import get_conn
from app.models import Contact, ContactIn

router = APIRouter(tags=["contact"])


@router.post("/contact", response_model=Contact, status_code=status.HTTP_201_CREATED)
def create_message(payload: ContactIn) -> Contact:
    conn = get_conn()
    with conn:
        cursor = conn.execute(
            "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
            (payload.name, payload.email, payload.message),
        )
    row = conn.execute(
        "SELECT * FROM messages WHERE id = ?", (cursor.lastrowid,)
    ).fetchone()
    conn.close()
    return Contact(
        id=row["id"],
        name=row["name"],
        email=row["email"],
        message=row["message"],
        created_at=row["created_at"],
    )
