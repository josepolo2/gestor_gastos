from flask import Blueprint, jsonify

from db import Session
from models import Expense

stats_bp = Blueprint("stats", __name__, url_prefix="/api")


@stats_bp.route("/stats", methods=["GET"])
def get_stats():
    session = Session()
    try:
        expenses = session.query(Expense).all()

        if not expenses:
            return jsonify(
                {
                    "total_expenses": 0,
                    "total_amount": 0,
                    "average_expense": 0,
                    "expenses_by_category": {},
                }
            ), 200

        total_expenses = len(expenses)
        total_amount = sum(e.amount for e in expenses)
        average_expense = total_amount / total_expenses if total_expenses > 0 else 0

        expenses_by_category = {}
        for expense in expenses:
            if expense.category not in expenses_by_category:
                expenses_by_category[expense.category] = 0
            expenses_by_category[expense.category] += expense.amount

        return jsonify(
            {
                "total_expenses": total_expenses,
                "total_amount": round(total_amount, 2),
                "average_expense": round(average_expense, 2),
                "expenses_by_category": expenses_by_category,
            }
        ), 200
    finally:
        session.close()
