from fastapi import APIRouter
from app.api.models.comments import Comment
from app.api.dependencies.dependencies import user_dependency, db_dependency

router = APIRouter(
    prefix="/comments",
    tags=["comments"]
)



@router.get("/")
async def read_comments(db: db_dependency):
    comments = db.query(Comment).all()
    return comments



