# from datetime import timedelta
# from fastapi.security import OAuth2PasswordBearer
# from fastapi import APIRouter, Depends, HTTPException, status
# from app.core.database.config import SessionLocal
# from typing import Annotated, Optional
# from passlib.context import CryptContext
# from jose import jwt, JWTError
# from datetime import datetime, timezone
# from app.api.models.users import User
# from app.api.schemas.users import UserRequest, LoginBase, Token
# from sqlalchemy.orm import Session
# from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
# from app.core.settings import get_settings
#
# settings = get_settings()
#
# security = HTTPBearer()
#
#
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()
#
#
# db_dependency = Annotated[Session, Depends(get_db)]
#
#
# router = APIRouter()
#
# SECRET_KEY = settings.SECRET_KEY
# ALGORITHM = settings.ALGORITHM
# ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES
#
# bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/login")
#
#
# def authenticate_user(username: str, password: str, db):
#     user = db.query(User).filter(
#         (User.username == username)
#     ).first()
#     if not user:
#         return False
#     if not bcrypt_context.verify(password, user.password_hash):
#         return False
#     return user
#
#
# def generate_access_token(data: dict, expires_delta: Optional[timedelta]):
#     to_encode = data.copy()
#     if expires_delta:
#         expire = datetime.now() + expires_delta
#     else:
#         expire = datetime.now() + timedelta(minutes=15)
#
#     to_encode.update([("exp", expire)])
#
#     return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#
#
# async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
#     token = credentials.credentials
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"}
#     )
#
#     try:
#         payload = jwt.decode(token, SECRET_KEY, ALGORITHM)
#         username: str = payload.get("username")
#         user_id: int = payload.get("user_id")
#         is_admin: bool = payload.get("is_admin", False)
#
#         if username is None or user_id is None:
#             raise credentials_exception
#
#         return {
#             'username': username,
#             'user_id': user_id,
#             'is_admin': is_admin
#         }
#     except JWTError:
#         raise credentials_exception
#
#
# def verify_password(plain_password, hashed_password):
#     return bcrypt_context.verify(plain_password, hashed_password)
#
#
# user_dependency = Annotated[dict, Depends(get_current_user)]
#
#
# @router.post("/register", status_code=status.HTTP_201_CREATED)
# async def register_user(user_request: UserRequest, db: db_dependency):
#     if db.query(User).filter(
#             (User.username == user_request.username) |
#             (User.email == user_request.email)
#     ).first():
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Username or email already registered"
#         )
#
#     user_model = User(
#         username=user_request.username,
#         email=user_request.email,
#         password_hash=bcrypt_context.hash(user_request.password),
#         full_name=user_request.full_name,
#         bio=user_request.bio,
#         avatar_url=user_request.avatar_url,
#         is_admin=False,
#         is_active=True,
#         created_at=datetime.now(timezone.utc)
#     )
#
#     try:
#         db.add(user_model)
#         db.commit()
#         db.refresh(user_model)
#         return {"message": "User created successfully", "username": user_model.username}
#     except Exception as e:
#         db.rollback()
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail=f"Error creating user: {e}"
#         )
#
#
# @router.post("/login", response_model=Token)
# async def login(
#         db: db_dependency,
#         form_data: LoginBase
# ):
#     user = db.query(User).filter(User.username == form_data.username).first()
#     if not user or not verify_password(form_data.password, user.password_hash):
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect username or password",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#
#     access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     access_token = generate_access_token(
#         data={"username": user.username, 'user_id': user.id, "is_admin": user.is_admin},
#         expires_delta=access_token_expires
#     )
#
#     return {"access_token": access_token, "token_type": "bearer"}
#
#
# @router.put("/users/{user_id}/make-admin", status_code=status.HTTP_200_OK)
# async def make_user_admin(
#     user_id: int,
#     db: db_dependency,
#     current_user: user_dependency
# ):
#
#     if current_user.get("is_admin") is False:
#         raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
#                             detail="You do not have permission to make this request")
#
#     user = db.query(User).filter(User.id == user_id).first()
#
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")
#
#     user.is_admin = True
#     db.commit()
#     db.refresh(user)
#
#     return {"message": f"User {user.username} is now an admin"}

from datetime import timedelta
from fastapi import APIRouter, HTTPException, status
from app.api.dependencies.dependencies import db_dependency
from app.api.controllers.auth import (
    authenticate_user,
    generate_access_token,
    register_user_logic,
    make_user_admin_logic,
)
from app.api.schemas.users import UserRequest, LoginBase, Token
from app.api.dependencies.dependencies import user_dependency
from app.core.settings import get_settings

settings = get_settings()

router = APIRouter()
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(user_request: UserRequest, db: db_dependency):
    try:
        user = register_user_logic(user_request, db)
        return {"message": "User created successfully", "username": user.username}
    except HTTPException as e:
        raise e


@router.post("/login", response_model=Token)
async def login(db: db_dependency, form_data: LoginBase):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = generate_access_token(
        data={"username": user.username, "user_id": user.id, "is_admin": user.is_admin},
        expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.put("/users/{user_id}/make-admin", status_code=status.HTTP_200_OK)
async def make_user_admin(user_id: int, db: db_dependency, current_user: user_dependency):
    return {"message": make_user_admin_logic(user_id, current_user, db)}
