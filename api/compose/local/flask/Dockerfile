FROM python:3.10.1-slim-buster

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN apt-get update \
  # dependencies for building Python packages
  && apt-get install -y build-essential \
  # psycopg2 dependencies
  && apt-get install -y libpq-dev \
  # Translations dependencies
  && apt-get install -y gettext \
  # cleaning up unused files
  && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Upgrade pip 
RUN pip install --upgrade pip
# Requirements are installed here to ensure they will be cached.
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . .

COPY compose/local/flask/start /start
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start

ENV FLASK_APP run
ENV FLASK_ENV development

CMD [ "/start" ]