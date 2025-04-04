from fastapi import APIRouter, status, HTTPException
from app.api.models.users import User
from sqlalchemy.orm import Session
from sqlalchemy.future import select
from app.api.schemas.users import UserUpdate
from app.api.dependencies.dependencies import db_dependency, user_dependency

router = APIRouter()


def get_user_info(db: Session, user_id: int):
    result = db.execute(select(User).where(User.id == user_id))
    user = result.scalars().first()
    if user is None:
        return None
    return user


@router.get("/me/", status_code=status.HTTP_200_OK)
async def get_current_user_info(current_user: user_dependency, db: db_dependency):
    user_data = get_user_info(db, current_user["user_id"])
    if not user_data:
        return {"error": "User not found"}
    return user_data


@router.put("/me/", status_code=status.HTTP_200_OK)
async def update_user_profile(
        current_user: user_dependency,
        db: db_dependency,
        user_update: UserUpdate
):
    user = get_user_info(db, current_user["user_id"])
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    update_data = user_update.dict(exclude_unset=True)

    for field, value in update_data.items():
        setattr(user, field, value)

    db.add(user)
    db.commit()
    db.refresh(user)

    return user
