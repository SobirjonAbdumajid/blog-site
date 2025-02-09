from typing import Optional
from pydantic import BaseModel
from datetime import datetime


class CategoryBase(BaseModel):
    name: str
    description: Optional[str] = None

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(CategoryBase):
    pass

class CategoryResponse(CategoryBase):
    slug: str
    created_at: datetime

    class Config:
        orm_mode = True
