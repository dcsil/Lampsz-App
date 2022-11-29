# Lampsz-App

Source code for Lampsz platform

## Development Setup

Make sure to have the following on your host:

- Python 3.10
- Node.js 18 and npm
- [Poetry](https://python-poetry.org/docs/)
- PostgresSQL

For UNIX system, also install the following packages:

- build-essential
- libpq-dev

Some Django settings are loaded through environment variables. For local
development, copy the `.env.example` file to `.env` file in the project
directory and fill in the content.

Also obtain the `client_secret.json` file from Google developer console.

To get started with local development:

1. Install required Python dependencies:

        $ poetry install

2. Install frontend Javascript dependencies:

        $ npm install

3. Build frontend files:

        $ npm run dev

4. Activate virtual environment:

        $ poetry shell

5. Export environment variable for Django settings:

        $ export DJANGO_SETTINGS_MODULE=lampsz.settings.local
        $ export OAUTHLIB_RELAX_TOKEN_SCOPE=1
        $ export OAUTHLIB_INSECURE_TRANSPORT=1

6. Apply Django database migrations:

        $ python manage.py migrate

7. To start django development server:

        $ python manage.py runserver

And you can now access the home page by going
to [127.0.0.1:8000](http://127.0.0.1:8000/)

## Linters

After installing the required packages through the steps above, the
pre-configured linters can be run.

### Code Style Enforcement

Running code style enforcement with flake8:

    $ flake8 --config=setup.cfg

### Type checks

Running type checks with mypy:

    $ mypy lampsz

### Pre-commit

All the linters have been configured into git pre-commit hooks. To utilize this,
run

    $ pre-commit install

And the hook should be run everytime when you commit.
