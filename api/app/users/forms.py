from flask_wtf import FlaskForm
from wtforms.fields import StringField, HiddenField, PasswordField, SubmitField, RadioField
from wtforms.validators import DataRequired

class NewUserFrom(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    password1 = PasswordField('password1', validators=[DataRequired()])
    password2 = PasswordField('password2', validators=[DataRequired()])

class UpdateUserForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    password1 = PasswordField('password1')
    password2 = PasswordField('password2')
    id = HiddenField('id')