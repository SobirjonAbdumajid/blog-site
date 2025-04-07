from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
# from app.core.settings import get_settings
from dotenv import load_dotenv
import os

# Load environment variables from .env file
dotenv = load_dotenv()

# settings = get_settings()

SQLALCHEMY_DATABASE_URL = f'postgresql://{os.getenv("POSTGRES_USER", "postgres")}:{os.getenv("POSTGRES_PASSWORD", "123")}@{os.getenv("POSTGRES_HOST", "localhost")}:{os.getenv("POSTGRES_PORT", "5432")}/{os.getenv("POSTGRES_DB", "blog_db")}'
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
