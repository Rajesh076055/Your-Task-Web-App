import React,{useState,useEffect} from 'react'
import './Body.css';
import axios from './axios';
import Navbar from './Navbar';
import ExerciseContainer from './ExerciseContainer';
function Body({user}) {
  

   
    const [task, setTask] = useState([]);
    const [isData, setisData] = useState(true);

    useEffect(()=>{
            async function fetchdata()
            {
                const req = await axios.get('/exercises/');
                
                setTask(req.data);

            }

            fetchdata();

      
    },[task]);

 
    
    
  return (
    <div className = "Body__Container">
        <Navbar/>
        <div className = "Body__Heading">
            <h1>Welcome {user}</h1>
        </div>
      {!isData && <h1>No any Exercises</h1>}
        <div className = "Task__List">
        {task.map((work) => (
             <ExerciseContainer 
             id = {work._id}
             username = {work.username}
             description = {work.description}
             duration = {work.duration}
             date = {work.date}
             image = {work.image}
             />
        ))}   
       
        </div>

       
    </div>
  )
}

export default Body