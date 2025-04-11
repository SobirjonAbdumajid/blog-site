from datetime import timedelta, datetime, timezone
from passlib.context import CryptContext
from jose import jwt
from app.api.repositories.auth import get_user_by_username, create_user, get_user_by_id
from app.api.models.users import User
from app.api.schemas.users import UserRequest
from fastapi import HTTPException, status
from app.core.settings import get_settings

settings = get_settings()

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM


def authenticate_user(username: str, password: str, db) -> User | None:
    user = get_user_by_username(db, username)
    if not user or not bcrypt_context.verify(password, user.password_hash):
        return None
    return user


def generate_access_token(data: dict, expires_delta: timedelta) -> str:
    to_encode = data.copy()
    expire = datetime.now() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def register_user_logic(user_request: UserRequest, db) -> User:
    if get_user_by_username(db, user_request.username):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    user = User(
        username=user_request.username,
        email=user_request.email,
        password_hash=bcrypt_context.hash(user_request.password),
        full_name=user_request.full_name,
        bio=user_request.bio,
        avatar_url=user_request.avatar_url,
        is_admin=False,
        is_active=True,
        created_at=datetime.now(timezone.utc)
    )
    return create_user(db, user)


def make_user_admin_logic(user_id: int, current_user: dict, db) -> str:
    if not current_user.get("is_admin"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to make this request"
        )

    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    user.is_admin = True
    db.commit()
    db.refresh(user)
    return f"User {user.username} is now an admin"
