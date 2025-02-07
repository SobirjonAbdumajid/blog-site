from app.core.models.base import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, func
from datetime import datetime


class Subscriber(Base):
    __tablename__ = "subscribers"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    is_active: Mapped[bool] = mapped_column(default=True)
    subscribed_at: Mapped[datetime] = mapped_column(default=func.now())
