import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

function Assignment() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedTask, setSelectedTask] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState('');
  const [assignmentSuccess, setAssignmentSuccess] = useState(false); 

  useEffect(() => {
    fetchTasks();
    fetchUsers();
    fetchAssignments();
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

  function fetchAssignments() {
    fetch('https://task-app-server-07x5.onrender.com/assignments')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch assignments');
        }
        return response.json();
      })
      .then(data => {
        setAssignments(data);
      })
      .catch(error => {
        console.error('Error fetching assignments:', error);
      });
  };

  function handleAssignTask(event) {
    event.preventDefault();
    fetch('https://task-app-server-07x5.onrender.com/assignments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskId: selectedTask, userId: selectedUser }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to assign task');
        }
        setAssignmentSuccess(true);
        fetchAssignments(); 
      })
      .catch(error => {
        console.error('Error assigning task:', error);
      });
  };

  function handleDeleteAssignment() {
    if (!selectedAssignment) {
      alert('Please select an assignment to delete.');
      return;
    }

    fetch(`https://task-app-server-07x5.onrender.com/assignments/${selectedAssignment}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete assignment');
        }
        
        fetchAssignments(); 
      })
      .catch(error => {
        console.error('Error deleting assignment:', error);
      });
  };

  return (
    <div>
      <Navbar />
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
        <button type="submit">Assign Task</button>
      </form>
            

      {assignmentSuccess && <p>Task assigned successfully!</p>}

      <div>
        <h2>Delete Assignment</h2>
        <label>
          Select Assignment:
          <select value={selectedAssignment} onChange={(e) => setSelectedAssignment(e.target.value)} required>
            <option value="">Select Assignment</option>
            {assignments.map(assignment => (
              <option key={assignment.id} value={assignment.id}>
                {assignment.task && assignment.user ? `Assignment ID: ${assignment.id} - Task: ${assignment.task.title} - User: ${assignment.user.name}` : 'Invalid Assignment Data'}
              </option>
            ))}
          </select>
        </label>
        <button onClick={handleDeleteAssignment}>Delete Assignment</button>
      </div>
    </div>
  );
}

export default Assignment;
