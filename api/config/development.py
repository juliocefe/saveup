
"""
Values to be used during development. 
Here you might specify the URI of a database sitting on localhost.
"""

DEBUG = True
SECRET_KEY = 'secret'
SQLALCHEMY_DATABASE_URI = ""


# Ayá en la documentación dice que esto podría no comportarse de la mejor manera si 
# setea encodigo pero me vale madre y se me hace más así
ENV='development' #'production' or 'development'