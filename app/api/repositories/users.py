from sqlalchemy.orm import Session
from sqlalchemy.future import select
from app.api.models.users import User
from app.api.schemas.users import UserUpdate


def get_user_info(db: Session, user_id: int) -> User:
    result = db.execute(select(User).where(User.id == user_id))
    user = result.scalars().first()
    return user


def update_user_profile(db: Session, user: User, user_update: UserUpdate) -> User:
    update_data = user_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(user, field, value)

    db.add(user)
    db.commit()
    db.refresh(user)
    return user
