from app.core.models.base import Base
from datetime import datetime
import enum
from typing import Optional, List
from sqlalchemy import ForeignKey, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

# from .base import Base
# from .enums import PostStatus
from .categories import Category  # Import after base definition
from .tags import Tag
from .comments import Comment
from .users import User


class PostStatus(enum.Enum):
    draft = "draft"
    published = "published"
    archived = "archived"


class Post(Base):
    __tablename__ = "posts"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String, nullable=False)
    slug: Mapped[str] = mapped_column(String, unique=True, nullable=False, index=True)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    excerpt: Mapped[Optional[str]] = mapped_column(Text)
    featured_image_url: Mapped[Optional[str]] = mapped_column(String)
    author_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    status: Mapped[PostStatus] = mapped_column(default=PostStatus.draft)
    is_featured: Mapped[bool] = mapped_column(default=False)
    view_count: Mapped[int] = mapped_column(default=0)
    published_at: Mapped[Optional[datetime]] = mapped_column()
    created_at: Mapped[datetime] = mapped_column(default=func.now())
    updated_at: Mapped[datetime] = mapped_column(default=func.now(), onupdate=func.now())

    # # Relationships
    # author: Mapped["User"] = relationship(back_populates="posts")
    # categories: Mapped[List["Category"]] = relationship(
    #     secondary="post_categories",
    #     back_populates="posts"
    # )
    # tags: Mapped[List["Tag"]] = relationship(
    #     secondary="post_tags",
    #     back_populates="posts"
    # )
    # comments: Mapped[List["Comment"]] = relationship(back_populates="post")
    author: Mapped["User"] = relationship(back_populates="posts")
    categories: Mapped[List["Category"]] = relationship(
        secondary="post_categories",
        back_populates="posts"
    )
    tags: Mapped[List["Tag"]] = relationship(
        secondary="post_tags",
        back_populates="posts"
    )
    comments: Mapped[List["Comment"]] = relationship(back_populates="post")
