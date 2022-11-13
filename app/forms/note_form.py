from flask_wtf import FlaskForm
from wtforms.fields import StringField, IntegerField, BooleanField, SubmitField, DateField, SelectField
from wtforms.validators import DataRequired


class NewNote(FlaskForm):
  body = StringField('Body', validators=[DataRequired()])
  submit = SubmitField("DEEEEZ")
