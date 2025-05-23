from pydantic import BaseModel, constr
from typing import Optional


class Token(BaseModel):
    access_token: str
    token_type: str


class UserRequest(BaseModel):
    username: constr(min_length=3, max_length=50)
    email: str
    password: constr(min_length=8)
    full_name: str
    bio: Optional[str] = None
    avatar_url: Optional[str] = None


class LoginResponse(Token):
    user_id: int
    username: str
    is_admin: bool


class UserUpdate(BaseModel):
    username: str | None = None
    email: str | None = None
    full_name: str | None = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None


class LoginBase(BaseModel):
    username: str = None
    password: str = None
