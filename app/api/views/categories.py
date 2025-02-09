from fastapi import APIRouter, Depends
from app.api.models.categories import Category
from typing import Annotated
from sqlalchemy.orm import Session
from app.api.views.auth import get_current_user

from app.core.database.config import SessionLocal

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]


@router.get("/categories")
async def get_categories(db: db_dependency):
    pass

