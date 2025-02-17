from fastapi import APIRouter, Depends, HTTPException
from app.api.models.categories import Category
from app.api.models.users import User
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


@router.get("/all/")
async def get_categories(
        db: db_dependency,
        skip: int = 0,
        limit: int = 10,

):
    categories = db.query(Category).offset(skip).limit(limit).all()
    return categories


@router.post("/")
async def make_category(
        db: db_dependency,
        category: CategoryBase,
        current_user: user_dependency
):
    slug = generate_slug(category.name)
    existing_category = db.query(Category).filter(Category.slug == slug).first()
    if existing_category:
        raise HTTPException(
            status_code=400,
            detail="Category with this title already exists"
        )

    category_data = category.dict()

    try:
        new_category = Category(
            **category_data,
            slug=slug
        )
        db.add(new_category)
        db.commit()
        db.refresh(new_category)
        return new_category
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Something wend wrong {e}")


@router.put("/{slug}")
async def update_category(
        current_user: user_dependency,
        db: db_dependency,
        category_update: CategoryBase,
        slug: str
):
    if not current_user["is_admin"]:
        raise HTTPException(status_code=403, detail="You are not allowed to update this category")

    category_data = db.query(Category).filter(Category.slug == slug).first()

    if not category_data:
        raise HTTPException(status_code=404, detail="Category not found")

    update_data = category_update.dict(exclude_unset=True)

    if "name" in update_data:
        new_slug = generate_slug(update_data["name"])
        if new_slug != slug:
            existing = db.query(Category).filter(Category.slug == new_slug).first()
            if existing:
                raise HTTPException(
                    status_code=400,
                    detail="Category with updated slug already exists"
                )
            update_data["slug"] = new_slug

    for key, value in update_data.items():
        setattr(category_data, key, value)

    db.commit()
    db.refresh(category_data)
    return category_data
