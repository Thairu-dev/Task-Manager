import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem'; // Assuming TaskItem component exists

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayedTasks, setDisplayedTasks] = useState(10); // Number of tasks to display initially
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  useEffect(() => {
    setLoading(true);
    axios.get('https://task-app-server-07x5.onrender.com/tasks')
      .then(response => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      });
  }, []);

  const handleDeleteTask = (id) => {
    axios.delete(`https://task-app-server-07x5.onrender.com/tasks/${id}`)
      .then(response => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  const handleShowMore = () => {
    // Increase the number of displayed tasks by 10
    setDisplayedTasks(displayedTasks + 10);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Update search term state
  };

  // Filter tasks based on search term
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Task List</h2>
      <div>
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <ul>
            {filteredTasks.slice(0, displayedTasks).map(task => (
              <TaskItem key={task.id} task={task} onDelete={() => handleDeleteTask(task.id)} />
            ))}
          </ul>
          {filteredTasks.length > displayedTasks && (
            <button onClick={handleShowMore}>Show More</button>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskList;
