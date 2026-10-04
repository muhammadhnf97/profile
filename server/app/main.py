import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db import init_db
from app.routers import contact

DEFAULT_ORIGINS = "http://localhost:4321,http://127.0.0.1:4321"


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(title="Profile API", lifespan=lifespan)

origins = os.environ.get("CLIENT_ORIGINS", DEFAULT_ORIGINS).split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in origins],
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

app.include_router(contact.router, prefix="/api")


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok"}
