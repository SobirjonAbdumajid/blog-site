from sqlalchemy.orm import Session
from sqlalchemy.future import select
from app.api.models.users import User


def get_user_by_id(db: Session, user_id: int) -> User | None:
    result = db.execute(select(User).where(User.id == user_id))
    return result.scalars().first()


def update_user(db: Session, user: User, update_data: dict) -> User:
    for field, value in update_data.items():
        setattr(user, field, value)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
