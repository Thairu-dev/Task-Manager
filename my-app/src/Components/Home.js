import React from 'react'
import Navbar from './Navbar'
import "./Home.css"
// import { Link } from 'react-router-dom'\


export default function Home() {
  return (
    <div  >
    <Navbar />
    <h1>Task manager app</h1>
      
      <img className='centered-element' src={"./images/3894977.jpg"} width={"200px"} alt={"home-img"}/>
      
      <h2 className='home-h1'><strong>Task manager app</strong> 
      <br></br> 
      An app that helps you manage tasks by letting you add users, add new tasks and assign the tasks to your users. </h2>

     
    </div>
    
  )
}
