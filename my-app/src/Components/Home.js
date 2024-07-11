import React from 'react'
import Navbar from './Navbar'
import "./Home.css"
// import { Link } from 'react-router-dom'\


export default function Home() {
  return (
    <div  >
    <Navbar />
    <h1>Task manager app</h1>
      
      <img className='centered-element' src={"./images/3894977.jpg"} width={"400px"} alt={"home-img"}/>

     
    </div>
    
  )
}
