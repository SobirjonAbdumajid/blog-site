from typing import Optional
from pydantic import BaseModel
from datetime import datetime


class CategoryBase(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    parent_id: Optional[int] = None


class CategoryResponse(CategoryBase):
    slug: str
    created_at: datetime

    class Config:
        orm_mode = True
