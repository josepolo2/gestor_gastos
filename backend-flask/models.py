from datetime import datetime

from sqlalchemy import Column, Date, DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from db import Base


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255))
    description = Column(String(255))

    expenses = relationship("Expense", back_populates="category_rel")


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, autoincrement=True)
    description = Column(String(255))
    amount = Column(Float)
    category = Column(Integer, ForeignKey("categories.id"))
    date = Column(Date)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

    category_rel = relationship("Category", back_populates="expenses")
