import {useState} from 'react';
import axios from './axios';
import './Forgotpassword.css';

function Forgotpassword() {

    const [email,setEmail] = useState('');
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');
    
    const eventHandler = async (e)=>
    {
        e.preventDefault();
        const config = {
            header:{
                "Content-type":"application/json"
            },
        };

        try {
            const {data} = await axios.post('/forgotpassword',{email},config);

            setSuccess(data.data);
        } catch (error) {
            setError(error.response.data.error);
            setEmail('');
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
                {success && <span className = 'span_message'>{success}</span>}
                <div className='form__group'>
                    <p>Please enter the email address linked with your account. You will get a 
                        reset link on that email
                    </p>
                    <label htmlFor='email'>Email</label>
                    <input 
                    type = 'email'
                    name = 'email'
                    required
                    onChange = {(e)=>setEmail(e.target.value)}></input>
                </div>
                <button type = 'submit'>Reset Password</button>
            </form>
        </div>
    )
}

export default Forgotpassword