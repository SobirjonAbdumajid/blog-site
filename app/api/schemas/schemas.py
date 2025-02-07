from pydantic import BaseModel, EmailStr, HttpUrl, constr
from typing import Optional, List
from datetime import datetime
from enum import Enum


class PostStatus(str, Enum):
    draft = "draft"
    published = "published"
    archived = "archived"


# User Schemas
class UserBase(BaseModel):
    username: constr(min_length=3, max_length=50)
    email: EmailStr
    full_name: Optional[str]
    bio: Optional[str]
    avatar_url: Optional[HttpUrl]


class UserCreate(UserBase):
    password: constr(min_length=8)


class UserUpdate(BaseModel):
    full_name: Optional[str]
    bio: Optional[str]
    avatar_url: Optional[HttpUrl]


class User(UserBase):
    id: int
    is_admin: bool
    created_at: datetime

    class Config:
        orm_mode = True


# Post Schemas
class PostBase(BaseModel):
    title: constr(min_length=1, max_length=200)
    content: str
    excerpt: Optional[str]
    featured_image_url: Optional[HttpUrl]
    status: PostStatus = PostStatus.draft
    is_featured: bool = False


class PostCreate(PostBase):
    category_ids: List[int] = []
    tag_ids: List[int] = []


class PostUpdate(BaseModel):
    title: Optional[str]
    content: Optional[str]
    excerpt: Optional[str]
    featured_image_url: Optional[HttpUrl]
    status: Optional[PostStatus]
    is_featured: Optional[bool]
    category_ids: Optional[List[int]]
    tag_ids: Optional[List[int]]


class Post(PostBase):
    id: int
    slug: str
    author_id: int
    reading_time: int
    view_count: int
    published_at: Optional[datetime]
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True


# Category Schemas
class CategoryBase(BaseModel):
    name: constr(min_length=1, max_length=100)
    description: Optional[str]
    parent_id: Optional[int]


class CategoryCreate(CategoryBase):
    pass


class CategoryUpdate(BaseModel):
    name: Optional[str]
    description: Optional[str]
    parent_id: Optional[int]


class Category(CategoryBase):
    id: int
    slug: str
    created_at: datetime
    post_count: Optional[int]

    class Config:
        orm_mode = True


# Tag Schemas
class TagBase(BaseModel):
    name: constr(min_length=1, max_length=50)


class TagCreate(TagBase):
    pass


class Tag(TagBase):
    id: int
    slug: str
    created_at: datetime
    post_count: Optional[int]

    class Config:
        orm_mode = True


# Comment Schemas
class CommentBase(BaseModel):
    content: str
    parent_id: Optional[int]


class CommentCreate(CommentBase):
    pass


class CommentUpdate(BaseModel):
    content: str


class Comment(CommentBase):
    id: int
    post_id: int
    user_id: int
    is_approved: bool
    created_at: datetime
    updated_at: Optional[datetime]
    replies: Optional[List['Comment']]

    class Config:
        orm_mode = True


# Subscriber Schemas
class SubscriberCreate(BaseModel):
    email: EmailStr


class Subscriber(BaseModel):
    id: int
    email: EmailStr
    is_active: bool
    subscribed_at: datetime

    class Config:
        orm_mode = True


# Contact Message Schemas
class ContactMessageCreate(BaseModel):
    name: constr(min_length=1, max_length=100)
    email: EmailStr
    subject: Optional[str]
    message: str


class ContactMessage(ContactMessageCreate):
    id: int
    is_read: bool
    created_at: datetime

    class Config:
        orm_mode = True


# Settings Schema
class Settings(BaseModel):
    site_title: str
    site_description: Optional[str]
    posts_per_page: int = 10
    enable_comments: bool = True
    require_comment_approval: bool = True
    notification_email: EmailStr

    class Config:
        orm_mode = True


# Response Schemas
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class DashboardStats(BaseModel):
    total_posts: int
    total_users: int
    total_comments: int
    total_subscribers: int
    recent_posts: List[Post]
    pending_comments: List[Comment]