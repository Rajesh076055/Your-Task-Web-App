import React, { useEffect, useState } from 'react'
import './UpdateExercise.css'
import axios from './axios';
function UpdateExercise() {

    const [getData,setgetData] = useState([]);
    const [changeData, setChangeData] = useState({
    });
    const [dataFound,setDataFound] = useState(false);

    useEffect(()=>{
        async function updateData()
        {
            const req = await axios.get('/exercises/');
                
            setgetData(req.data);
        }

        updateData();
    },[])


    const handleSubmit = (e) =>
    {   
        e.preventDefault();
        const username = e.target.username;
        const description = e.target.description;
        const duration = (e.target.duration);
        const date = (e.target.date);
        const NewPost = 
        {
          username:username.value,
          description:description.value,
          duration:duration.value,
          date:date.value
        }
        axios.post(`/exercises/update/${changeData.id}`,NewPost);

        window.location.assign('/');
        

    }
    const SearchForData = (e) =>
    {   e.preventDefault();

       const username = e.target.username;
       getData.map((item)=>
       {
 
        if(item.username === username.value)
        {   
            setDataFound(true);
            setChangeData(item);
        }
       })

       
    }

  


  return (
    <div className='UpdateExercise__Container'>
        {!dataFound && <div className = 'searchData__Container'>
        <h1>Search for Exercise</h1>
        
            <form className = "UpdateExercise__Form" onSubmit={SearchForData}>
            <input type = "text" name = 'username'  placeholder = 'Enter the UserName'></input>
            <button type = 'submit'>Search</button>
            </form>
        </div>}
      


          {dataFound && <div className='updateData__Container'>
                <h1>Update the Exercise {changeData.username}</h1>
                <form className = "UpdateExercise__Form" onSubmit = {handleSubmit} >
                    <input type = "text" name = 'username'  placeholder = 'username'></input>
                    <input type = "text"  name = 'description' placeholder = 'description' id = "description" ></input>
                    <input type = "number" name = 'duration'  placeholder = 'duration' ></input>
                    <input type = "date" name = 'date'  placeholder = 'date'  id = 'date' ></input>
                    <button type = 'submit'>Submit</button>
                 </form>
          </div>}
   
    </div>
  )
}

export default UpdateExercise