import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import Navbar from './Navbar';

function formatDateToYMD(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newTask, setNewTask] = useState({ title: '', due_date: '', description: '', user_id: '' });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://task-app-server-07x5.onrender.com/tasks');
        if (!response.ok) {
          throw new Error('Error fetching tasks');
        }
        const data = await response.json();
        setTasks(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch('https://task-app-server-07x5.onrender.com/users');
        if (!response.ok) {
          throw new Error('Error fetching users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
    fetchUsers();
  }, []);

  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`https://task-app-server-07x5.onrender.com/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error deleting task');
      }
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateTask = async (e) => {
    console.log(JSON.stringify(newTask))
    e.preventDefault();
    try {
      const response = await fetch('https://task-app-server-07x5.onrender.com/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) {
        throw new Error('Failed to create task: Server responded with ' + response.status);
      }
      const data = await response.json();
      setTasks([...tasks, data]);
      setNewTask({ title: '', due_date: '', description: '', user_id: '' });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
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
          value={newTask.due_date} 
          onChange={(e) => {
            const formattedDate = formatDateToYMD(e.target.value);
            setNewTask({ ...newTask, due_date: formattedDate });
          }}  
          required 
        />
        <textarea 
          placeholder="Description" 
          value={newTask.description} 
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} 
          required 
        />
        <select
          value={newTask.user_id}
          onChange={(e) => setNewTask({ ...newTask, user_id: e.target.value })}
          required
        >
          <option value="">Select User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
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
