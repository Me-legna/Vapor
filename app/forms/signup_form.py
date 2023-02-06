from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first() or User.query.filter(User.developer_alias == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def developer_alias_exists(form, field):
    # Checking if username is already in use
    developer_alias = field.data
    user = User.query.filter(User.developer_alias == developer_alias).first() or User.query.filter(User.username == developer_alias).first()
    if user:
        raise ValidationError('Alias is already in use.')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(message='Username is required'), Length(min=4, max=25), username_exists])
    developer_alias = StringField(
        'developer_alias', validators=[DataRequired(message='Alias is required until future features are implented'),developer_alias_exists])
    email = StringField('email', validators=[DataRequired(message='Email is required'), user_exists])
    password = StringField('password', validators=[DataRequired(message='Please enter a password and make it strong like my coffee.'), Length(min=6)])
