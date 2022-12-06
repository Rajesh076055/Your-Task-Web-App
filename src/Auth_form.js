import React,{useState,useEffect} from 'react'
import axios from './axios';
import {Link} from 'react-router-dom';
import './Auth_form.css';
import { type } from '@testing-library/user-event/dist/type';


function Auth_form({history}) {
    const [email,setemail] = useState('');
    const [password,setpassword] = useState('');
    const [error,setError] = useState('');

    useEffect(()=>{
        if(localStorage.getItem("authToken"))
        {
            window.location.assign('/exercises');
        }
    },[history]);

 

    const eventHandle =  (event)=>
    {
        event.preventDefault();
        const config = {
            header:{
                "Content-Type":"application/json"
            }
        }
        
        try {
           
            
            const {data} =  axios.post('/login',{email,password},config);
           
            localStorage.setItem("authToken",data.token);
            window.location.assign('/exercises');
            
        } catch (error) {
            setError(error.response);
            setTimeout(()=>
            {
                setError('');
            },5000)
        }
    }
    return (
    <div className='Login__Screen'>
    <form className='Login__Form' onSubmit={eventHandle}>
        <h1>Login</h1>
        <div className='Form__Controls'>
            {error && <span style = {{color:'black'}}>{error}</span>}

            <label htmlFor = "email">Email</label>
            <input type = 'text' name = 'email'
            required
            onChange = {(e)=> setemail(e.target.value)}
            ></input>


            <label htmlFor = "password">Password</label>
            <input type = 'password' name = 'password'
            required
            onChange = {(e)=>setpassword(e.target.value)}
            ></input>


            
        </div>

        <button type = 'submit' className = 'Login_Form_button'>Login</button>
        <div className='update_or_add'>
        <Link to = '/ForgetPassword'> <span className='Login_ForgetPart'>Forget Password?</span></Link>
        <Link to = '/Register'><span className='Login_RegisterPart'>Create Account</span></Link>
        </div>
    
    </form>    
    </div>
  )
}

export default Auth_form