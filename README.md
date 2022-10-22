# Lampsz-App
Source code for Lampsz platform

## Development Setup

Make sure to have the following on your host:
- Python 3.10

To get started with Django development:
1. Install required Python dependencies:

        $ poetry install

2. Activate virtual environment:

        $ poetry shell

3. Apply Django database migrations:

        $ python manage.py migrate

4. To start django development server:

        $ python manage.py runserver

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
