from fastapi import APIRouter, Depends, HTTPException, status
from app.api.models.posts import Post
from sqlalchemy.orm import Session
from typing import Annotated, List, Optional
from app.core.database.config import SessionLocal
from app.api.views.auth import get_current_user
from app.api.schemas.posts import PostCreate, PostBase, PostResponse, PostStatus
from datetime import datetime


router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]


def generate_slug(name: str) -> str:
    return name.lower().replace(" ", "-")[:50]


def admin_required(current_user: user_dependency):
    if not current_user.get("is_admin"):
        raise HTTPException(status_code=403, detail="Admin access required")


# --- Endpoints ---

@router.get("/posts", response_model=List[PostResponse])
async def list_posts(
        db: db_dependency,
        skip: int = 0,
        limit: int = 10,
        category: Optional[str] = None,
        tag: Optional[str] = None,
        status: Optional[PostStatus] = PostStatus.published
):
    query = db.query(Post)

    if category:
        query = query.filter(Post.category == category)
    if tag:
        query = query.filter(Post.tags.contains([tag]))
    if status:
        query = query.filter(Post.status == status)

    posts = query.offset(skip).limit(limit).all()
    return posts


@router.post("/posts", response_model=PostResponse, status_code=status.HTTP_201_CREATED)
async def create_post(
        db: db_dependency,
        current_user: user_dependency,
        post: PostCreate
):
    slug = generate_slug(post.title)
    existing_post = db.query(Post).filter(Post.slug == slug).first()
    if existing_post:
        raise HTTPException(
            status_code=400,
            detail="Post with this title already exists"
        )

    # Create dictionary without slug field
    post_data = post.dict()

    new_post = Post(
        **post_data,  # Now doesn't contain slug
        slug=slug,
        author_id=current_user["user_id"]
    )

    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

@router.get("/posts/{slug}", response_model=PostResponse)
async def get_post(db: db_dependency, slug: str):
    post = db.query(Post).filter(Post.slug == slug).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


@router.put("/posts/{slug}", response_model=PostResponse)
async def update_post(
        db: db_dependency,
        current_user: user_dependency,
        slug: str,
        post_update: PostBase
):
    post = db.query(Post).filter(Post.slug == slug).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    if post.author_id != current_user["user_id"]:
        raise HTTPException(
            status_code=403,
            detail="Not authorized to update this post"
        )

    update_data = post_update.dict(exclude_unset=True)

    if "title" in update_data:
        new_slug = generate_slug(update_data["title"])
        if new_slug != slug:
            existing = db.query(Post).filter(Post.slug == new_slug).first()
            if existing:
                raise HTTPException(
                    status_code=400,
                    detail="Post with updated title already exists"
                )
            update_data["slug"] = new_slug

    for key, value in update_data.items():
        setattr(post, key, value)

    post.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(post)
    return post


@router.delete("/posts/{slug}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_post(
        db: db_dependency,
        current_user: user_dependency,
        slug: str
):
    post = db.query(Post).filter(Post.slug == slug).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    if post.author_id != current_user["user_id"]:
        raise HTTPException(
            status_code=403,
            detail="Not authorized to delete this post"
        )

    db.delete(post)
    db.commit()