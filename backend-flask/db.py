import os

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///expenses.db")
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+psycopg2://", 1)

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
Session = scoped_session(sessionmaker(bind=engine))
Base = declarative_base()


def init_db() -> None:
    from models import Category, Expense  # noqa: F401

    Base.metadata.create_all(engine)
