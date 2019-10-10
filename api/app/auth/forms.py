from flask_wtf import FlaskForm
from wtforms.fields import StringField, HiddenField, PasswordField, SubmitField, RadioField
from wtforms.validators import DataRequired

class LoginForm(FlaskForm):
    username = StringField('Nombre del usuario', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired])
    submit = SubmitField('Login')