// import NavBar from "./NavBar"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Assignment from "./Components/Assignment";
import Login from "./Components/Login";
import Signup from "./Components/SignUp";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import Userlist from "./Components/Userlist";
import Home from "./Components/Home"
import TaskPage from "./Components/TaskPage";
import './App.css';

function App() {
  return (
    // <NavBar />  
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/assignment" element={<Assignment/>}/>
        <Route path= "/signup" element={<Signup/>}/>
        <Route path="/taskform" element={<TaskForm/>}/>
        <Route path="/tasklist" element={<TaskList/>}/>
        <Route path="/userlist" element={<Userlist/>}/>
        <Route path="/taskpage" element={<TaskPage/>}/>

    </Routes>
</BrowserRouter>
  );
}

export default App;

