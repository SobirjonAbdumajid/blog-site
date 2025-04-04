from fastapi import APIRouter, HTTPException, status
from app.api.models.posts import Post
from app.api.models.post_category import PostCategory
from app.api.models.categories import Category
from typing import List, Optional
from app.api.schemas.posts import PostCreate, PostBase, PostResponse, PostStatus
from datetime import datetime
from app.api.dependencies.dependencies import db_dependency, user_dependency


router = APIRouter()


def generate_slug(name: str) -> str:
    return name.lower().replace(" ", "-")


def admin_required(current_user: user_dependency):
    if not current_user.get("is_admin"):
        raise HTTPException(status_code=403, detail="Admin access required")


# --- Endpoints ---


@router.get("/all/", response_model=List[PostResponse])
async def all_posts(
        db: db_dependency,
        skip: int = 0,
        limit: int = 10,
        # input_status: Optional[PostStatus] = PostStatus.published
):
    posts = db.query(Post).offset(skip).limit(limit).all()
    return posts


@router.get("/my", response_model=List[PostResponse])
async def my_posts(
        db: db_dependency,
        current_user: user_dependency,
        skip: int = 0,
        limit: int = 10,
        post_status: Optional[PostStatus] = None
):
    query = db.query(Post).filter(Post.author_id == current_user["user_id"])

    if post_status is not None:
        query = query.filter(Post.status == post_status)

    posts = query.offset(skip).limit(limit).all()
    return posts


@router.get("/{slug}", response_model=PostResponse)
async def get_post(db: db_dependency, slug: str):
    post = db.query(Post).filter(Post.slug == slug).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


@router.post("/", response_model=PostResponse, status_code=status.HTTP_201_CREATED)
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

    try:
        categories = db.query(Category).filter(Category.id.in_(post.categories)).all()

        new_post = Post(
            slug=slug,
            author_id=current_user["user_id"],
            # category=categories,
            **post.dict(),  # Now doesn't contain slug
        )

        new_post_category = PostCategory(
            post_id=new_post.id,
            category_id=categories
        )

        db.add(new_post_category)
        db.add(new_post)
        db.commit()
        db.refresh(new_post)
        return new_post
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Something went wrong: {e}")


@router.put("/{slug}", response_model=PostResponse)
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
    if "categories" in update_data:
        categories = db.query(Category).filter(
            Category.id.in_(update_data["categories"])
        ).all()
        post.categories = categories
        del update_data["categories"]

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

    post.updated_at = datetime.now()

    db.commit()
    db.refresh(post)
    return post


@router.delete("/{slug}", status_code=status.HTTP_204_NO_CONTENT)
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
