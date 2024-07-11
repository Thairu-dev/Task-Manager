import React from 'react';

const TaskItem = ({ task, onDelete }) => {
  const { id, title, due_date, description } = task;

  return (
    <li key={id}>
      <div>
        <h3>{title}</h3>
        <p><strong>Due Date:</strong> {due_date}</p>
        <p>{description}</p>
        <button onClick={onDelete}>Delete</button>
      </div>
    </li>
  );
};

export default TaskItem;
