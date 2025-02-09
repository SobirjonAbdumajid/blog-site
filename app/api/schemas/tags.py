from pydantic import BaseModel
from datetime import datetime


class TagBase(BaseModel):
    name: str

class TagCreate(TagBase):
    pass

class TagResponse(TagBase):
    id: int
    slug: str
    created_at: datetime

    class Config:
        orm_mode = True