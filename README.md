# Lampsz-App
Source code for Lampsz platform

## Development Setup

Make sure to have the following on your host:
- Python 3.10
- [Poetry](https://python-poetry.org/docs/)
- PostgresSQL 14

Some Django settings are loaded through environment variables. For local development, create a `.env` file in the project directory and put the following items in:

    DATABASE_URL=postgres://<username>:<password>@localhost/<database_name>
    SECRET_KEY=test_key
    DEBUG=True



To get started with Django development:
1. Install required Python dependencies:

        $ poetry install

2. Activate virtual environment:

        $ poetry shell

3. Apply Django database migrations:

        $ python manage.py migrate

4. To start django development server:

        $ python manage.py runserver

And you can now access the home page by going to [127.0.0.1:8000](http://127.0.0.1:8000/)

## Linters

After installing the required packages through the steps above, the pre-configured linters can be run.

### Code Style Enforcement

Running code style enforcement with flake8:

    $ flake8 --config=setup.cfg

### Type checks

Running type checks with mypy:

    $ mypy lampsz

### Pre-commit

All the linters have been configured into git pre-commit hooks. To utilize this, run

    $ pre-commit install

And the hook should be run everytime when you commit.
