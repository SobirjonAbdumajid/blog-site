from app.core.models.base import Base
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column


class PostCategory(Base):
    __tablename__ = "post_categories"

    post_id: Mapped[int] = mapped_column(ForeignKey("posts.id"), primary_key=True)
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"), primary_key=True)
