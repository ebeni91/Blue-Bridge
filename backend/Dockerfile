# Use a lightweight official Python image
FROM python:3.11-slim

# Set environment variables for Python behavior
# PYTHONDONTWRITEBYTECODE: Prevents Python from writing .pyc files to disk
# PYTHONUNBUFFERED: Ensures console output is not buffered by Docker (easier debugging)
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies required for PostgreSQL
RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file and install dependencies
COPY requirements/base.txt requirements/production.txt ./
RUN pip install --upgrade pip \
    && pip install -r production.txt

# Copy the actual Django project code into the container
COPY . .

# SECURITY: Create a non-root user and switch to it
RUN adduser --disabled-password --no-create-home django-user
RUN chown -R django-user:django-user /app
USER django-user

# Expose the port Gunicorn will run on
EXPOSE 8000

# Use Gunicorn (a production-grade server) instead of Django's built-in dev server
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "config.wsgi:application"]