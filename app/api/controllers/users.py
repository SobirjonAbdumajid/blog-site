from fastapi import APIRouter, status, HTTPException
from app.api.dependencies.dependencies import db_dependency, user_dependency
from app.api.schemas.users import UserUpdate
from app.api.repositories.users import get_user_info, update_user_profile

router = APIRouter()


@router.get("/me/", status_code=status.HTTP_200_OK)
async def get_current_user_info(current_user: user_dependency, db: db_dependency):
    user_data = get_user_info(db, current_user["user_id"])
    if not user_data:
        return {"error": "User not found"}
    return user_data


@router.put("/me/", status_code=status.HTTP_200_OK)
async def update_user_data(
    current_user: user_dependency,
    db: db_dependency,
    user_update: UserUpdate
):
    user = get_user_info(db, current_user["user_id"])
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    updated_user = update_user_profile(db, user, user_update)
    return updated_user
