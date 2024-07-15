import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem'; 
import Navbar from './Navbar';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newTask, setNewTask] = useState({ title: '', dueDate: '', description: '' });

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
    axios.delete(`https://task-app-server-07x5.onrender.com/tasks/${id}`)
      .then(response => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(error => console.error(error));
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    axios.post('https://task-app-server-07x5.onrender.com/tasks', newTask)
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewTask({ title: '', dueDate: '', description: '' });
      })
      .catch(error => console.error(error));
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar/>
      <h2 className='task-list'>Tasks List</h2>
      
      <input 
        type="text" 
        placeholder="Search tasks..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />

      <form onSubmit={handleCreateTask}>
        <input 
          type="text" 
          placeholder="Title" 
          value={newTask.title} 
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} 
          required 
        />
        <input 
          type="date" 
          placeholder="Due Date" 
          value={newTask.dueDate} 
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} 
          required 
        />
        <textarea 
          placeholder="Description" 
          value={newTask.description} 
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} 
          required 
        />
        <button type="submit">Add Task</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} onDelete={() => handleDeleteTask(task.id)} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;