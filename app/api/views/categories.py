from fastapi import APIRouter, Depends, HTTPException
from app.api.models.categories import Category
from app.api.models.posts import Post
from typing import Annotated
from sqlalchemy.orm import Session
from app.api.views.auth import get_current_user
from app.api.schemas.categories import CategoryBase
from app.core.database.config import SessionLocal
from app.api.views.posts import admin_required, generate_slug

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]


@router.get("/all")
async def get_categories(db: db_dependency):
    categories = db.query(Category).all()
    return categories


@router.post("/categories")
async def make_category(
        db: db_dependency,
        category: CategoryBase,
        admin: admin_required,
        current_user: user_dependency
):
    slug = generate_slug(category.name)
    existing_category = db.query(Category).filter(Category.slug == slug).first()
    if existing_category:
        raise HTTPException(
            status_code=400,
            detail="Post with this title already exists"
        )

    category_data = category.dict()

    try:
        new_category = Post(
            **category_data,
            slug=slug
        )
        db.add(new_category)
        db.commit()
        db.refresh(new_category)
        return new_category
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Something wend wrong {e}")

