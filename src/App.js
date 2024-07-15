import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Assignment from './Components/Assignment';
import Login from './Components/Login';
import Signup from './Components/SignUp';
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';
import UserList from './Components/Userlist';
import Home from './Components/Home';
import TaskPage from './Components/TaskPage';
import ProtectedRoute from './Components/ProtectedRoute';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route 
          path="/assignment" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Assignment />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/taskform" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <TaskForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/tasklist" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <TaskList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/userlist" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UserList />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/taskpage" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <TaskPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
