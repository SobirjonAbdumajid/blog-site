from datetime import datetime
from app.core.models.base import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Text, func
from typing import Optional


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String, nullable=False)
    full_name: Mapped[Optional[str]] = mapped_column(String)
    bio: Mapped[Optional[str]] = mapped_column(Text)
    avatar_url: Mapped[Optional[str]] = mapped_column(String)
    is_admin: Mapped[bool] = mapped_column(default=False)
    created_at: Mapped[datetime] = mapped_column(default=func.now())
    updated_at: Mapped[datetime] = mapped_column(default=func.now(), onupdate=func.now())


# app/api/models/users.py
# from datetime import datetime, timezone
# from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
# from sqlalchemy.orm import relationship
# from app.core.database.config import Base
#
#
# class User(Base):
#     __tablename__ = "users"
#
#     id = Column(Integer, primary_key=True, index=True)
#     username = Column(String, unique=True, index=True)
#     email = Column(String, unique=True, index=True)
#     password_hash = Column(String)
#     full_name = Column(String)
#     bio = Column(String, nullable=True)
#     avatar_url = Column(String, nullable=True)
#     is_admin = Column(Boolean, default=False)
#     is_active = Column(Boolean, default=True)
#     created_at = Column(DateTime, default=datetime.now(timezone.utc))
#
#     # Use lazy="dynamic" if you expect many posts
#     posts = relationship("Post", back_populates="author")
#
#
# class Post(Base):
#     __tablename__ = "posts"
#
#     id = Column(Integer, primary_key=True, index=True)
#     title = Column(String)
#     content = Column(String)
#     author_id = Column(Integer, ForeignKey("users.id"))
#     created_at = Column(DateTime, default=datetime.now(timezone.utc))
#
#     author = relationship("User", back_populates="posts")
