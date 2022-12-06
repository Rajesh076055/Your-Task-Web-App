import React,{useState,useEffect} from 'react'
import axios from './axios';
import {Link} from 'react-router-dom';
import './Register.css';

function Register() {
    const [formDetails,setFormDetails] = useState({
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    });

    const [error,setError] = useState('');

    useEffect(()=>{
        if(localStorage.getItem("authToken"))
        {
            window.location.assign('/exercises');
        }
    },[]);
    const eventHandle = async (event)=>
    {
        event.preventDefault();

        if(formDetails.password!== formDetails.confirmPassword) {
            setFormDetails(...formDetails,{password:""});
            setFormDetails(...formDetails,{confirmPassword:""});
            setTimeout(()=>{
                setError('')
            },5000);

            return setError("Passwords do not match");
        }

        try {
            const username = formDetails.username;
            const email = formDetails.email;
            const password = formDetails.password;
            const {data} = await axios.get('/register',{username,email,password});

            localStorage.setItem("authToken",data.token);

            window.location.assign('/login');
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(()=>
            {
                setError('');
            },5000)
        }
    }
      return (
    <div className='Register__Screen'>
    <form className='Register__Form' onSubmit={eventHandle}>
        <h3>Register</h3>
        <div className='Form__Controls'>
            <label htmlFor = "name">Username</label>
            {error && <span>{error}</span>}
            <input type = 'text' name = 'username'
            required
            onChange = {(e)=> setFormDetails(...formDetails, {username:e.target.value})}
            ></input>

            <label htmlFor = "email">Email</label>
            <input type = 'text' name = 'email'
            required
            onChange = {(e)=> setFormDetails(...formDetails, {email:e.target.value})}
            ></input>


            <label htmlFor = "password">Password</label>
            <input type = 'password' name = 'password'
            required
            onChange = {(e)=> setFormDetails(...formDetails, {password:e.target.value})}
            ></input>


            <label htmlFor = "password">Confirm Password</label>
            <input type = 'password' name = 'password'
            required
            onChange = {(e)=> setFormDetails(...formDetails, {confirmPassword:e.target.value})}
            ></input>
        </div>

        <button type = 'submit' className = 'register_Form_button'>Register</button>

        <span className='register_loginPart'>Already have an account?<Link to = '/login'>Login</Link></span>
    </form>    
    </div>
  )
}

export default Register