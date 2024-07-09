from random import randint, choice as rc
from faker import Faker

from app import app
from models import db, User, Task, Assignment

fake = Faker()

with app.app_context():

    print("Deleting all records...")
    Assignment.query.delete()
    Task.query.delete()
    User.query.delete()

    print("Creating users...")

    users = []
    emails = []

    for i in range(20):
        
        email = fake.email()
        while email in emails:
            email = fake.email()
        emails.append(email)

        user = User(
            name=fake.name(),
            email=email
        )

        users.append(user)

    db.session.add_all(users)
    db.session.commit()  # Commit users to the database

    print("Creating tasks...")
    tasks = []
    for i in range(50):
        user = rc(users)
        task = Task(
            title=fake.sentence(),
            description=fake.paragraph(nb_sentences=5),
            due_date=fake.future_date(),
            user_id=user.id  # Assign a user_id to each task
        )

        tasks.append(task)

    db.session.add_all(tasks)
    db.session.commit()  # Commit tasks to the database

    print("Creating assignments...")
    assignments = []
    statuses = ['Not Started', 'In Progress', 'Completed']
    for task in tasks:
        for _ in range(randint(1, 5)):
            user = rc(users)
            status = rc(statuses)
            assignment = Assignment(
                task_id=task.id,
                user_id=user.id,
                status=status
            )
            assignments.append(assignment)

    db.session.add_all(assignments)
    db.session.commit()  # Commit assignments to the database

    print("Complete.")