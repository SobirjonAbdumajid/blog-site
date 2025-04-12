from sqlalchemy.orm import Session
from app.api.repositories.posts import get_all_post_info, get_all_my_posts, get_all_post_info_with_slug


def get_post_info(db: Session, skip: int, limit: int):
    post = get_all_post_info(db, skip, limit)
    return post if post else []



def get_my_posts(db: Session, user_id: int, skip: int, limit: int, post_status: str | None = None):
    """
    Fetches posts created by the current user.
    """
    my_posts = get_all_my_posts(db, user_id, skip, limit, post_status)
    return my_posts if my_posts else []


def get_post_info_with_slug(db: Session, slug: str, skip: int, limit: int):
    post_with_slug = get_all_post_info_with_slug(db, slug, skip, limit)
    return post_with_slug if post_with_slug else []