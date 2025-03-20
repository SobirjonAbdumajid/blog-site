from sqlalchemy.orm import Session
from fastapi import APIRouter

router = APIRouter(
    prefix="/comments",
    tags=["comments"]
)

@router.get("/")
async def read_comments():
    pass


