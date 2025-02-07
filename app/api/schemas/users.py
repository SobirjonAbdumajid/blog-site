from pydantic import BaseModel, EmailStr, constr
from typing import Optional


class Token(BaseModel):
    access_token: str
    token_type: str


class UserRequest(BaseModel):
    username: constr(min_length=3, max_length=50)
    email: EmailStr
    password: constr(min_length=8)
    full_name: str
    bio: Optional[str] = None
    avatar_url: Optional[str] = None


class LoginResponse(Token):
    user_id: int
    username: str
    is_admin: bool
