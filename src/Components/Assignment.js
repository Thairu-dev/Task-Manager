import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

function AssignmentForm() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedTask, setSelectedTask] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [status, setStatus] = useState('');

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
  }

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
  }

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
  }

  function handleAssignTask(event) {
    event.preventDefault();
    const assignmentData = { "task_id": selectedTask, "user_id": selectedUser, "status": status };
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
        return response.json();
      })
      .then(data => {
        console.log('Task assigned successfully:', data);
        fetchAssignments();
      })
      .catch(error => {
        console.error('Error assigning task:', error);
      });
  }

  function updateAssignmentStatus(assignmentId, newStatus) {
    const updateData = { "status": newStatus };
    fetch(`https://task-app-server-07x5.onrender.com/assignments/${assignmentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update status');
        }
        
        fetchAssignments();
      })
      .catch(error => {
        console.error('Error updating status:', error);
      });
  }

  return (
    <div className="center aligned content">
      <Navbar />
      <h2 className="assignment-heading">Assign Task</h2>
      <img className="centered-element" src={"./images/3894977.jpg"} width={"200px"} alt={"home-img"} />
      <div className="assignments-container">
        <form className="assignment-form" onSubmit={handleAssignTask}>
          <label>
            Task:
            <select value={selectedTask} onChange={(e) => setSelectedTask(e.target.value)} required>
              <option value="">Select Task</option>
              {tasks.map(task => (
                <option key={task.id} value={task.id}>{task.title}</option>
              ))}
            </select>
          </label>
          <br />
          <label>
            User:
            <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required>
              <option value="">Select User</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Status:
            <select value={status} onChange={(e) => setStatus(e.target.value)} required>
              <option value="">Select Status</option>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
          <br />
          <button className="ui button" type="submit">Assign Task</button>
        </form>
        <h2>Assignments</h2>
        <ul>
          {assignments.map(assignment => (
            <li key={assignment.id}>
              Task: {assignment.task_id || 'N/A'} - User: {assignment.user_id || 'N/A'} - Status: {assignment.status}
              {assignment.status === 'Not Started' && (
                <button onClick={() => updateAssignmentStatus(assignment.id, 'In Progress')}>Start</button>
              )}
              {assignment.status === 'In Progress' && (
                <>
                  <button onClick={() => updateAssignmentStatus(assignment.id, 'Not Started')}>Reset</button>
                  <button onClick={() => updateAssignmentStatus(assignment.id, 'Completed')}>Complete</button>
                </>
              )}
              {assignment.status === 'Completed' && (
                <button onClick={() => updateAssignmentStatus(assignment.id, 'In Progress')}>Reopen</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AssignmentForm;
