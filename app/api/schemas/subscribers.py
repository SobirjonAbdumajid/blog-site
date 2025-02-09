from pydantic import BaseModel, EmailStr
from datetime import datetime


class SubscriberCreate(BaseModel):
    email: EmailStr

class SubscriberResponse(SubscriberCreate):
    subscribed_at: datetime

    class Config:
        orm_mode = True

class StatsResponse(BaseModel):
    total_posts: int
    total_comments: int
    total_users: int
    total_subscribers: int

class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    is_admin: bool

    class Config:
        orm_mode = True