from fastapi import APIRouter


router = APIRouter()


@router.get('/users/')
async def root():
    return
