import uuid

from flask import Blueprint, jsonify, request

from db import Session
from models import Category
from serializers import dict_from_category

categories_bp = Blueprint("categories", __name__, url_prefix="/api")

DEFAULT_CATEGORIES = [
    {"name": "Comida", "description": "Gastos en alimentos"},
    {"name": "Transporte", "description": "Gastos en transporte"},
    {"name": "Entretenimiento", "description": "Gastos en entretenimiento"},
    {"name": "Salud", "description": "Gastos en salud"},
    {"name": "Otros", "description": "Otros gastos"},
]


def init_categories() -> None:
    session = Session()
    try:
        existing = session.query(Category).count()
        if existing == 0:
            for cat in DEFAULT_CATEGORIES:
                category = Category(
                    name=cat["name"],
                    description=cat["description"],
                )
                session.add(category)
            session.commit()
    finally:
        session.close()


@categories_bp.route("/categories", methods=["GET"])
def get_categories():
    session = Session()
    try:
        categories = session.query(Category).all()
        return jsonify([dict_from_category(c) for c in categories]), 200
    finally:
        session.close()


