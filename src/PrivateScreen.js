import React,{useState,useEffect} from 'react';
import axios from './axios';
import {Navigate} from 'react-router-dom';
import Body from './Body';

function PrivateScreen({history}) {
    const [error,setError] = useState("");
    const [privateData, setPrivateData] = useState('');

    useEffect(()=>{
        if(!localStorage.getItem("authToken"))
        {
            window.location.assign('/login');
        }

        const fetchPrivatesData = async() =>{
            const config = {
                header:{
                    "Content-Type":'application/json',
                    Authorization:`Bearer ${localStorage.getItem('authToken')}`
                }
            }

            try {
                const {data} = await axios.get('/private',config);
                setPrivateData(data.data);
            } catch (error) {
                localStorage.removeItem("authToken");
                setError("You are not authorized. Please Login");
            }
        }

        fetchPrivatesData();
    },[history]);

   
  return (
    error?(<span className='error-message'>{error}</span>):(
        <>
        <Body user = "Rajesh"></Body>
  
        </>
       
    )
   
  )
}

export default PrivateScreen