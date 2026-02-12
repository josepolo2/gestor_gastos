from flask import Flask
from flask_cors import CORS

from db import init_db
from routes.categories import categories_bp, init_categories
from routes.expenses import expenses_bp
from routes.health import health_bp
from routes.stats import stats_bp


def create_app() -> Flask:
    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(health_bp)
    app.register_blueprint(expenses_bp)
    app.register_blueprint(categories_bp)
    app.register_blueprint(stats_bp)

    return app


app = create_app()


if __name__ == '__main__':
    init_db()
    init_categories()
    app.run(debug=True, host='0.0.0.0', port=5000)
