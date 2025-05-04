from app.core.models.base import Base



class Advisor(Base):
    __tablename__ = "advisors"

    advice_uzbek: Mapped[str] = mapped_column(String, nullable=False)