import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './Assignment.css';


function AssignmentForm() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTask, setSelectedTask] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [status, setStatus] = useState(''); 

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
      .then(data => {
        console.log('Task assigned successfully:', data);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error assigning task:', error);
      });
  };

  return (
    <div class="center aligned content" >
      <Navbar/>
      <h2 class="assignment-heading" >Assign Task</h2>
      <img className='centered-element' src={"./images/3894977.jpg"} width={"200px"} alt={"home-img"}/>
      <div className='assignments-container'>
      <form className='assignment-form' onSubmit={handleAssignTask}>
        <label>
          Task:
          <select value={selectedTask} onChange={(e) => setSelectedTask(e.target.value)} required>
            <option value="">Select Task</option>
            {tasks.map(task => (
              <option key={task.id} value={task.id}>{task.title}</option>
            ))}
          </select>
        </label>
        <br></br>
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
        <br></br>
        <button class="ui button" type="submit">Assign Task</button>
        {/* <button class="ui button">Assign Task</button> */}
      </form>
      </div>
    </div>
  );
}

<div role="listbox" aria-expanded="false" class="ui fluid selection dropdown" tabindex="0"><div aria-atomic="true" aria-live="polite" role="alert" class="divider default text">Select Friend</div><i aria-hidden="true" class="dropdown icon"></i><div class="menu transition"><div style="pointer-events:all" role="option" aria-checked="false" aria-selected="true" class="selected item"><img src="/images/avatar/small/jenny.jpg" class="ui avatar image"/><span class="text">Jenny Hess</span></div><div style="pointer-events:all" role="option" aria-checked="false" aria-selected="false" class="item"><img src="/images/avatar/small/elliot.jpg" class="ui avatar image"/><span class="text">Elliot Fu</span></div><div style="pointer-events:all" role="option" aria-checked="false" aria-selected="false" class="item"><img src="/images/avatar/small/stevie.jpg" class="ui avatar image"/><span class="text">Stevie Feliciano</span></div><div style="pointer-events:all" role="option" aria-checked="false" aria-selected="false" class="item"><img src="/images/avatar/small/christian.jpg" class="ui avatar image"/><span class="text">Christian</span></div><div style="pointer-events:all" role="option" aria-checked="false" aria-selected="false" class="item"><img src="/images/avatar/small/matt.jpg" class="ui avatar image"/><span class="text">Matt</span></div><div style="pointer-events:all" role="option" aria-checked="false" aria-selected="false" class="item"><img src="/images/avatar/small/justen.jpg" class="ui avatar image"/><span class="text">Justen Kitsune</span></div></div></div>

export default AssignmentForm;
