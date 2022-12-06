import React,{useState} from 'react'
import './CreateExercise.css';
import axios from './axios';

function CreateExercise() {
 
  const [postData, setPostData] = useState(
    {
       username:'',
       description:'',
       duration:'',
       date:'',
      
    }
  )

    const handleEvent = (e) =>
    {e.preventDefault();
      const username = e.target.username;
      const description = e.target.description;
      const duration = (e.target.duration);
      const date = (e.target.date);

        
      const NewPost = 
      {
        username:username.value,
        description:description.value,
        duration:duration.value,
        date:date.value,
    
      }
    
      console.log(NewPost);
     axios.post('/exercises/add',NewPost);
     window.location.assign('/');
     
    }
 
  return (
    <div className='CreateExercise__Container'>
        <h1>Create New Exercise</h1>
    
          <form className = "CreateExercise__Form" onSubmit={handleEvent}>
            <input type = "text" name = 'username'  placeholder = 'username' onChange={(e)=>setPostData({...postData,username:e.target.value})}></input>
            <input type = "text"  name = 'description' placeholder = 'description' id = "description" onChange={(e)=>setPostData({...postData,description:e.target.value})}></input>
            <input type = "number" name = 'duration'  placeholder = 'duration' onChange={(e)=>setPostData({...postData,duration:e.target.value})}></input>
            <input type = "date" name = 'date'  placeholder = 'date'  id = 'date' onChange={(e)=>setPostData({...postData,date:e.target.value})}></input>
         
            <button type = 'submit'>Submit</button>
          </form>
   
    </div>
  )
}

export default CreateExercise