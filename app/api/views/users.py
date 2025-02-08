from fastapi import APIRouter, Depends
from app.api.models.users import User
from app.api.views.auth import get_current_user
from app.core.database.config import SessionLocal
from typing import Annotated
from sqlalchemy.orm import Session



def get_db():
    db = SessionLocal
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]


router = APIRouter()


@router.get('/users/')
async def root():
    return
