from flask_wtf import FlaskForm
from wtforms.fields import StringField, SelectField, TextAreaField, FloatField, DateField
from wtforms.validators import DataRequired, Length, NumberRange


class GameForm(FlaskForm):
    title = StringField('Game Title', validators=[DataRequired(), Length(min=2, max=100)])
    # release_date = DateField('Game Release Date', validators=[])
    price = FloatField('Game Price', validators=[NumberRange(min=0)])
    description = TextAreaField('Game Description', validators=[Length(min=2, max=2500)])
    rating = SelectField('Game Rating', choices=[('E', 'Everyone'), ('T', 'Teen'), ('M', 'Mature')], validate_choice=True)
