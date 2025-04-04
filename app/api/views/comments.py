from sqlalchemy.orm import Session
from fastapi import APIRouter
from app.api.models.comments import Comment

router = APIRouter(
    prefix="/comments",
    tags=["comments"]
)



@router.get("/")
async def read_comments(db: ):



