from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.api.repositories.users import get_user_by_id, update_user
from app.api.schemas.users import UserUpdate


def get_user_info(db: Session, user_id: int):
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user


def update_user_profile(db: Session, user_id: int, user_update: UserUpdate):
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    update_data = user_update.dict(exclude_unset=True)
    return update_user(db, user, update_data)
