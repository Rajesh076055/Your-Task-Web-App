import React from 'react'
import './Navbar.css'
import {BrowserRouter as Router,NavLink} from 'react-router-dom';

function Navbar() {
  const logoutHandler = ()=>
  {
    localStorage.removeItem("authToken");
    window.location.assign('/');
  }
  return (

  
    <div className = "Navbar__Container">
        <div className = "Navbar__Logo">
         <NavLink to = '/'><img src = "https://cdn.pixabay.com/photo/2017/07/25/11/59/logo-2537871_640.png"/></NavLink> 
        </div>
        <div className='Navbar__List'>
             
             <ul>
             <NavLink to = '/exercises/CreateExercise'> <a href = "#"><li>Create Exercise</li></a></NavLink> 
             <NavLink to = '/exercises/UpdateExercise'> <a href = "#"><li>Update Exercise</li></a></NavLink> 
             <a onClick={logoutHandler}><li>Log Out</li></a>
            
          
              
             </ul>
            
         
        
        </div>
           
    </div>
  )
}

export default Navbar