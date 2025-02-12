from app.core.models.base import Base
from datetime import datetime
from typing import List
from sqlalchemy import String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .posts import Post


class Tag(Base):
    __tablename__ = "tags"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    created_at: Mapped[datetime] = mapped_column(default=func.now())

    # Relationships
    posts: Mapped[List["Post"]] = relationship(
        secondary="post_tags",
        back_populates="tags"
    )
