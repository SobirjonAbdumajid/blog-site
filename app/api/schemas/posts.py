from enum import Enum
from pydantic import BaseModel
from typing import Optional, List, Text
from datetime import datetime


class PostStatus(str, Enum):
    draft = "draft"
    published = "published"
    archived = "archived"


class PostBase(BaseModel):
    title: str
    content: str
    excerpt: Optional[str] = None
    # slug: Optional[str] = None
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
