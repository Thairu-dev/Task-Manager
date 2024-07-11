import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('https://task-app-server-07x5.onrender.com/tasks', {
        title,
        description,
        due_date: dueDate,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Call onAddTask function with the newly created task from response data
      onAddTask(response.data);

      // Clear form inputs after successful task creation
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (error) {
      console.error('Task creation failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
