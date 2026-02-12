import uuid
from datetime import datetime

from flask import Blueprint, jsonify, request

from db import Session
from models import Expense
from serializers import dict_from_expense

expenses_bp = Blueprint("expenses", __name__, url_prefix="/api")

@expenses_bp.route("/expenses", methods=["GET"])
def get_expenses():
    session = Session()
    try:
        expenses = session.query(Expense).all()
        return jsonify([dict_from_expense(e) for e in expenses]), 200
    finally:
        session.close()

@expenses_bp.route("/expenses/<int:expense_id>", methods=["GET"])
def get_expense(expense_id):
    session = Session()
    try:
        expense = session.query(Expense).filter_by(id=expense_id).first()
        if not expense:
            return jsonify({"error": "Expense not found"}), 404
        return jsonify(dict_from_expense(expense)), 200
    finally:
        session.close()

@expenses_bp.route("/expenses", methods=["POST"])
def create_expense():
    session = Session()
    try:
        data = request.get_json()

        if not data or not all(k in data for k in ["description", "amount", "category", "date"]):
            return jsonify({"error": "Missing required fields"}), 400

        expense = Expense(
            description=data["description"],
            amount=float(data["amount"]),
            category=int(data["category"]),
            date=datetime.strptime(data["date"], "%Y-%m-%d").date(),
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        session.add(expense)
        session.commit()

        return jsonify(dict_from_expense(expense)), 201
    except Exception as exc:
        session.rollback()
        return jsonify({"error": str(exc)}), 500
    finally:
        session.close()

@expenses_bp.route("/expenses/<int:expense_id>", methods=["PUT"])
def update_expense(expense_id):
    session = Session()
    try:
        expense = session.query(Expense).filter_by(id=expense_id).first()
        if not expense:
            return jsonify({"error": "Expense not found"}), 404

        data = request.get_json() or {}

        if "description" in data:
            expense.description = data["description"]
        if "amount" in data:
            expense.amount = float(data["amount"])
        if "category" in data:
            expense.category = int(data["category"])
        if "date" in data:
            expense.date = datetime.strptime(data["date"], "%Y-%m-%d").date()

        expense.updated_at = datetime.utcnow()
        session.commit()

        return jsonify(dict_from_expense(expense)), 200
    except Exception as exc:
        session.rollback()
        return jsonify({"error": str(exc)}), 500
    finally:
        session.close()

@expenses_bp.route("/expenses/<int:expense_id>", methods=["DELETE"])
def delete_expense(expense_id):
    session = Session()
    try:
        expense = session.query(Expense).filter_by(id=expense_id).first()
        if not expense:
            return jsonify({"error": "Expense not found"}), 404

        session.delete(expense)
        session.commit()

        return jsonify({"message": "Expense deleted"}), 200
    except Exception as exc:
        session.rollback()
        return jsonify({"error": str(exc)}), 500
    finally:
        session.close()
