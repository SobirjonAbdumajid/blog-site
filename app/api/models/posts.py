from app.core.models.base import Base
from datetime import datetime
from typing import Optional
from sqlalchemy import ForeignKey, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column


class Post(Base):
    __tablename__ = "posts"

    # id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String, nullable=False)
    slug: Mapped[str] = mapped_column(String, unique=True, nullable=False, index=True)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    excerpt: Mapped[Optional[str]] = mapped_column(Text)
    featured_image_url: Mapped[Optional[str]] = mapped_column(String)
    author_id: Mapped[int] = mapped_column(ForeignKey('users.id'))
    status: Mapped[str] = mapped_column(default="draft")
    is_featured: Mapped[bool] = mapped_column(default=False)
    view_count: Mapped[int] = mapped_column(default=0)
    published_at: Mapped[Optional[datetime]] = mapped_column()
    created_at: Mapped[datetime] = mapped_column(default=func.now())
    updated_at: Mapped[datetime] = mapped_column(default=func.now(), onupdate=func.now())
    #
    # categories: Mapped[List["Category"]] = relationship(
    #     secondary="post_categories",
    #     back_populates="posts"
    # )
    #
    # tags: Mapped[List["Tag"]] = relationship(
    #     secondary="post_tags",
    #     back_populates="posts"
    # )
