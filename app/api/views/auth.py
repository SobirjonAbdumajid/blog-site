from datetime import timedelta
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import APIRouter, Depends, HTTPException, status
from app.core.database.config import SessionLocal
from typing import Annotated
from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timezone
from app.api.models.users import User
from app.api.schemas.users import UserRequest


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[get_db, Depends(get_db)]


router = APIRouter()

SECRET_KEY = "edb5e3d67900e484d36233945c9777e44de164ee6c13e4317f250bab65cffae9"
ALGORITHM = "HS256"

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="api/token")


def authenticate_user(username: str, password: str, db):
    user = db.query(User).filter(
        (User.username == username)
    ).first()
    if not user:
        return False
    if not bcrypt_context.verify(password, user.password_hash):
        return False
    return user


def generate_access_token(username: str, user_id: int, is_admin: bool, expires_delta: timedelta):
    encode = {
        'username': username,
        'user_id': user_id,
        'is_admin': is_admin,
        'type': 'access'
    }
    expire = datetime.now(timezone.utc) + expires_delta
    encode.update({'exp': expire})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)


async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]) -> dict:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, ALGORITHM)
        username: str = payload.get("username")
        user_id: int = payload.get("user_id")
        is_admin: bool = payload.get("is_admin", False)
        token_type: str = payload.get("token_type")

        if username is None or user_id is None or token_type != "access":
            raise credentials_exception

        return {
            'username': username,
            'user_id': user_id,
            'is_admin': is_admin
        }
    except JWTError:
        raise credentials_exception


async def get_current_admin(
    current_user: Annotated[dict, Depends(get_current_user)]
) -> dict:
    if not current_user.get("is_admin"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions"
        )
    return current_user


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(user_request: UserRequest, db: db_dependency):
    if db.query(User).filter(
            (User.username == user_request.username) |
            (User.email == user_request.email)
    ).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already registered"
        )

    user_model = User(
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

    try:
        db.add(user_model)
        db.commit()
        db.refresh(user_model)
        return {"message": "User created successfully", "username": user_model.username}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error creating user"
        )
