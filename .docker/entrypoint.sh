#!/bin/bash
set -e


# Then exec the container's main process (what's set as CMD in the Dockerfile).
python /app/manage.py migrate
python /app/manage.py runserver 0.0.0.0:8000
