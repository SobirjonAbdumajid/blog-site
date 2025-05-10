from app.core.models.base import Base
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String


class Advisor(Base):
    __tablename__ = "advisors"

    advice_uzbek: Mapped[str] = mapped_column(String, nullable=False)
    advice_english: Mapped[str] = mapped_column(String, nullable=False)