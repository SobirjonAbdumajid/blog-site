from fastapi import APIRouter, Depends, status
from app.api.models.users import User
from app.api.views.auth import get_current_user
from app.core.database.config import SessionLocal
from typing import Annotated
from sqlalchemy.orm import Session
from sqlalchemy.future import select



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]


router = APIRouter()


def get_user_info(db: Session, user_id: int):
    result = db.execute(select(User).where(User.id == user_id))
    user = result.scalars().first()

    if user is None:
        return None

    return user


@router.get("/users/me/", status_code=status.HTTP_200_OK)
async def get_current_user_info(
    current_user: user_dependency, db: db_dependency
):
    user_data = get_user_info(db, current_user["user_id"])

    if not user_data:
        return {"error": "User not found"}

    return user_data
