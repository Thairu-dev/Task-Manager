import React, { useState, useEffect } from 'react';

function AssignmentForm() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTask, setSelectedTask] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [status, setStatus] = useState(''); // New state for status

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  function fetchTasks() {
    fetch('https://task-app-server-07x5.onrender.com/tasks')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        return response.json();
      })
      .then(data => {
        setTasks(data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  };

  function fetchUsers() {
    fetch('https://task-app-server-07x5.onrender.com/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  function handleAssignTask(event) {
    event.preventDefault();
    const assignmentData = { "task_id": selectedTask, "user_id": selectedUser, "status": status};
    console.log(assignmentData)
    fetch('https://task-app-server-07x5.onrender.com/assignments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assignmentData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to assign task');
        }
      })
      .catch(error => {
        console.error('Error assigning task:', error);
      });
  };

  return (
    <div>
      <h2>Assign Task</h2>
      <form onSubmit={handleAssignTask}>
        <label>
          Task:
          <select value={selectedTask} onChange={(e) => setSelectedTask(e.target.value)} required>
            <option value="">Select Task</option>
            {tasks.map(task => (
              <option key={task.id} value={task.id}>{task.title}</option>
            ))}
          </select>
        </label>
        <label>
          User:
          <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required>
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="">Select Status</option>
            <option value="In Progress">Not Started</option>
            <option value="Pending">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
        <button type="submit">Assign Task</button>
      </form>
    </div>
  );
}

export default AssignmentForm;
