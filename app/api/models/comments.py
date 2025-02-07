from app.core.models.base import Base
from datetime import datetime
from typing import Optional
from sqlalchemy import ForeignKey, Text, func
from sqlalchemy.orm import Mapped, mapped_column


class Comment(Base):
    __tablename__ = "comments"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    post_id: Mapped[int] = mapped_column(ForeignKey("posts.id"))
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    parent_id: Mapped[Optional[int]] = mapped_column(ForeignKey("comments.id"), nullable=True)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    is_approved: Mapped[bool] = mapped_column(default=False)
    created_at: Mapped[datetime] = mapped_column(default=func.now())
    updated_at: Mapped[datetime] = mapped_column(default=func.now(), onupdate=func.now())

    # post: Mapped["Post"] = relationship(back_populates="comments")
    # user: Mapped["User"] = relationship(back_populates="comments")
    # replies: Mapped[List["Comment"]] = relationship()
    # parent: Mapped[Optional["Comment"]] = relationship(remote_side=[id])
