from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class Note(db.Model):
    __tablename__ = 'notes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    body = db.Column(db.String(200), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    task_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tasks.id')))
    created_at = db.Column(db.DateTime, default= datetime.utcnow)
    updated_at = db.Column(db.DateTime, default= datetime.utcnow)
    # cohort = db.relationship("Cohort", back_populates="students")


    def to_dict(self):
        return {
            "id": self.id,
            "body": self.body,
            "user_id": self.user_id,
            "task_id": self.task_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }