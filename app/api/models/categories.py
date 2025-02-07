from app.core.models.base import Base
from datetime import datetime
from typing import List, Optional
from sqlalchemy import ForeignKey, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.api.models.posts import Post


class Category(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    slug: Mapped[str] = mapped_column(String, unique=True, nullable=False, index=True)
    description: Mapped[Optional[str]] = mapped_column(Text)
    parent_id: Mapped[Optional[int]] = mapped_column(ForeignKey("categories.id"))
    created_at: Mapped[datetime] = mapped_column(default=func.now())

    # Relationships
    posts: Mapped[List["Post"]] = relationship(
        secondary="post_categories",
        back_populates="categories"
    )
    children: Mapped[List["Category"]] = relationship()
    parent: Mapped[Optional["Category"]] = relationship(remote_side=[id])
