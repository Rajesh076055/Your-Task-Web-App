import {useState} from 'react';
import axios from './axios';
import {Link} from 'react-router-dom';
import './Resetpassword.css';

function Forgotpassword({history,match}) {

    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPasword] = useState('');
    const [success,setSuccess] = useState('');
    const [error,setError] = useState('');
    
    const eventHandler = async (e)=>
    {
        e.preventDefault();
        const config = {
            header:{
                "Content-type":"application/json"
            },
        };

        if(password!= confirmPassword) {
          setPassword('');
          setConfirmPasword('');
            setTimeout(()=>{
                setError('')
            },5000);

            return setError("Passwords do not match");
        }


        try {
            const {data} = await axios.post(`/resetpassword/${match.params.resetToken}`,{password},config);

            setSuccess(data.data);
        } catch (error) {
            setError(error.response.data.error);
            setPassword('');
            setConfirmPasword('');
            setTimeout(()=>{
                setError("");
            },5000);
        }
    }
    return(
        <div className='forgotPassword__Container'>
            <form onSubmit={eventHandler}>
                <h3>Forgot Password</h3>
                {error && <span className='error_message'>{error}</span>}
                {success && <span className = 'span_message'>{success} <Link to ='/Login'>Login</Link></span>}
                <div className='form__group'>
                  
                    <label htmlFor='password'>New password</label>
                    <input 
                    type = 'password'
                    name = 'password'
                    required
                    onChange = {(e)=>setPassword(e.target.value)}></input>
                    <label htmlFor='password'>Confirm password</label>
                    <input 
                    type = 'password'
                    name = 'password'
                    required
                    onChange = {(e)=>setConfirmPasword(e.target.value)}></input>
                </div>
                <button type = 'submit'>Reset Password</button>
            </form>
        </div>
    )
}

export default Forgotpassword