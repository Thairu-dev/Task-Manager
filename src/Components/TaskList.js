import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import Navbar from './Navbar';
import './TaskList.css'; // Import the TaskList.css for styling

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newTask, setNewTask] = useState({ title: '', dueDate: '', description: '', userId: '' });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);
    // Fetch tasks
    fetch('https://task-app-server-07x5.onrender.com/tasks')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      });

    // Fetch users
    fetch('https://task-app-server-07x5.onrender.com/users')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleDeleteTask = (id) => {
    fetch(`https://task-app-server-07x5.onrender.com/tasks/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    fetch('https://task-app-server-07x5.onrender.com/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setTasks([...tasks, data]);
        setNewTask({ title: '', dueDate: '', description: '', userId: '' });
      })
      .catch(error => console.error('Error creating task:', error));
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="task-list-container">
      <Navbar />
      <h2 className='task-list-heading'>Tasks List</h2>
      
      <input 
        type="text" 
        placeholder="Search tasks..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        className="search-input"
      />

      <form onSubmit={handleCreateTask} className="task-form">
        <input 
          type="text" 
          placeholder="Title" 
          value={newTask.title} 
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} 
          required 
          className="task-input"
        />
        <input 
          type="date" 
          placeholder="Due Date" 
          value={newTask.dueDate} 
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} 
          required 
          className="task-input"
        />
        <textarea 
          placeholder="Description" 
          value={newTask.description} 
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} 
          required 
          className="task-textarea"
        />
        <select
          value={newTask.userId}
          onChange={(e) => setNewTask({ ...newTask, userId: e.target.value })}
          required
          className="task-select"
        >
          <option value="">Select User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button type="submit" className="task-button">Add Task</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="task-items">
          {filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} onDelete={() => handleDeleteTask(task.id)} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
