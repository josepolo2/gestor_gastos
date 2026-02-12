from models import Category, Expense


def dict_from_expense(expense: Expense) -> dict:
    return {
        "id": expense.id,
        "description": expense.description,
        "amount": expense.amount,
        "category": expense.category,
        "date": expense.date.isoformat() if expense.date else None,
        "created_at": expense.created_at.isoformat() if expense.created_at else None,
        "updated_at": expense.updated_at.isoformat() if expense.updated_at else None,
    }


def dict_from_category(category: Category) -> dict:
    return {
        "id": category.id,
        "name": category.name,
        "description": category.description,
    }
