from sqlalchemy.orm import Session
from app.api.models.posts import Post


def get_all_post_info(db: Session, skip: int, limit: int):
    """
    Fetches all post information from the database.
    """
    post = db.query(Post).offset(skip).limit(limit).all()
    return post


def get_all_my_posts(db: Session, user_id: int, skip: int, limit: int, post_status: str | None = None):
    """
    Fetches posts created by the current user.
    """
    query = db.query(Post).filter(Post.author_id == user_id)

    if post_status is not None:
        query = query.filter(Post.status == post_status)

    posts = query.offset(skip).limit(limit).all()
    return posts


def get_all_post_info_with_slug(db: Session, slug: str, skip: int, limit: int):
    """
    Fetches post information based on the provided slug.
    """
    posts = db.query(Post).filter(Post.slug == slug).offset(skip).limit(limit).all()
    return posts