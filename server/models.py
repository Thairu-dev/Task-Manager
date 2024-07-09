#!/usr/bin/env python3

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship, validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    
    tasks = db.relationship('Task', backref='user', lazy=True)
    assignments = db.relationship('Assignment', backref='user', lazy=True)
    
    serialize_rules = ('-tasks.user', '-assignments.user')

    @validates('email')
    def validate_email(self, key, email):
        assert '@' in email, "Invalid email format"
        return email

    def __repr__(self):
        return f"<User {self.name}>"

class Task(db.Model, SerializerMixin):
    __tablename__ = 'tasks'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    due_date = db.Column(db.Date, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    assignments = db.relationship('Assignment', backref='task', lazy=True)
    
    serialize_rules = ('-user.tasks', '-assignments.task', '-assignments.user')

    def __repr__(self):
        return f"<Task {self.title}>"

class Assignment(db.Model, SerializerMixin):
    __tablename__ = 'assignments'
    
    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey('tasks.id', ondelete='CASCADE'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    
    serialize_rules = ('-task.assignments', '-user.assignments', '-task.user', '-user.tasks')

    def __repr__(self):
        return f"<Assignment {self.id} - Task {self.task_id} - User {self.user_id} - Status {self.status}>"