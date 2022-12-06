import React from 'react'

import './ExerciseContainer.css';
import axios from './axios';
function ExerciseContainer({id,username, description, duration, date}) {
    
    const deleteItem = () =>
    {   axios.delete(`exercises/${id}`);
        
    }
  return (


    
  
        <div className='Container__items'>
                <div className='Container__Image'>
                    <img src ={``}/>
                </div>
                <div className = "Container__User">
                    <h3>Username: {username}</h3>
                </div>
                <div className = "Container__Description">
                    <h3>Task: {description}</h3>
                </div>
                <div className = "Container__Duration">
                    <h3>Working Time: {duration}</h3>
                </div>
                <div className = "Container__Date">
                    <h3>Deadline: {date}</h3>
                </div>

                <div className = "Container__UpdateDelete">
                    <button onClick= {deleteItem}>Delete</button>
                    <button>Update</button>

                </div>
        </div>
       
  
  )
}

export default ExerciseContainer