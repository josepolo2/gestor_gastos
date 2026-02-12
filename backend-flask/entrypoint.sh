#!/bin/sh
set -e

echo "Initializing database..."
python -c "from db import init_db; from routes.categories import init_categories; init_db(); init_categories(); print('Database initialized successfully')"

echo "Starting Flask server..."
exec python app.py
