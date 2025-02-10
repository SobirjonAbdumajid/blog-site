from enum import Enum
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class PostStatus(str, Enum):
    draft = "draft"
    published = "published"
    archived = "archived"
#
#
# class PostBase(BaseModel):
#     title: str
#     slug: str
#     content: str
#     excerpt: Optional[str] = None
#     category: Optional[str] = None
#     featured_image_url: Optional[str] = None
#     status: PostStatus = PostStatus.draft
#
#
# class PostCreate(PostBase):
#     pass
#
# class PostUpdate(BaseModel):
#     title: Optional[str] = None
#     content: Optional[str] = None
#     category: Optional[str] = None
#     tags: Optional[List[str]] = None
#     status: Optional[PostStatus] = None
#
# class PostResponse(PostBase):
#     id: int
#     slug: str
#     author_id: int
#     created_at: datetime
#     updated_at: datetime
#
#     class Config:
#         orm_mode = True


class PostBase(BaseModel):
    title: str
    content: str
    excerpt: Optional[str] = None
    slug: Optional[str] = None
    featured_image_url: Optional[str] = None
    status: PostStatus = PostStatus.draft

class PostCreate(PostBase):
    # Remove slug from create schema
    pass

class PostResponse(PostBase):
    # Add slug in response schema
    id: int
    slug: str
    author_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
