import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://task-app-server-07x5.onrender.com/tasks');
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = async (id) => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage

    try {
      await axios.delete(`https://task-app-server-07x5.onrender.com/tasks/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}` // Set authorization header with token
        }
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <h1>Task Management</h1>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList tasks={tasks} loading={loading} onDeleteTask={handleDeleteTask} />
    </div>
  );
};

export default TaskPage;
