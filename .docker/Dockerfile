# Python build stage
FROM python:3.10-slim-bullseye as python-build-stage

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    POETRY_VERSION=1.2.2

# Register Yarn package source.
RUN curl --silent --location https://deb.nodesource.com/setup_18.x | bash -

# Install apt packages
RUN apt update -qq
RUN apt install -y build-essential libpq-dev nodejs npm

# Install Poetry
RUN pip install "poetry==$POETRY_VERSION"

WORKDIR /app
COPY ./ /app

# Install node depedencies
RUN npm install && npm run build

# Install Python dependencies
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi --no-root

EXPOSE 8000

COPY ./.docker/entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["/usr/bin/entrypoint.sh"]
