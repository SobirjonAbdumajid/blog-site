from fastapi import FastAPI
from app.core.settings import get_settings
from app.api.views.users import router as users_router
from app.api.views.auth import router as auth_router
from app.api.views.posts import router as posts_router
from app.api.views.categories import router as categories_router

settings = get_settings()

app = FastAPI(
    title=settings.PROJECT_NAME,
    description=settings.PROJECT_DESCRIPTION,
    version=settings.PROJECT_VERSION
)

app.include_router(users_router, prefix="/users", tags=["users"])
app.include_router(auth_router, prefix='/auth', tags=["auth"])
app.include_router(posts_router, prefix='/posts', tags=["posts"])
app.include_router(categories_router, prefix='/categories', tags=["categories"])
