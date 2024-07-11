import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem'; // Assuming TaskItem component exists
// import TaskList from './Tasklist';
import Navbar from './Navbar';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('https://task-app-server-07x5.onrender.com/tasks')
      .then(response => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleDeleteTask = (id) => {
    axios.delete(`https://task-app-server-07x5.onrender.com/tasks${id}`)
      .then(response => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <Navbar/>
      <h2>Task List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} onDelete={() => handleDeleteTask(task.id)} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
