
"""
Values to be used during development. 
Here you might specify the URI of a database sitting on localhost.
"""
import os
from datetime import timedelta


DEBUG = True
JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=int(os.environ.get("JWT_ACCESS_TOKEN_EXPIRES")))
SECRET_KEY = os.environ.get("SECRET_KEY", "Very secret")
SQLALCHEMY_DATABASE_URI = os.environ["SQLALCHEMY_DATABASE_URI"]

# Ayá en la documentación dice que esto podría no comportarse de la mejor manera si 
# setea encodigo pero me vale madre y se me hace más así
ENV='development' #'production' or 'development'