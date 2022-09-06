import React, {useState} from 'react'
import './LoginCard.scss'
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

export const LoginCard = () => {

    const navigate = useNavigate();

    const [passwordValidation, setPasswordValidation] = useState(true);

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState(false);



    const handleSubmit = (e) => {
        e.preventDefault();

        if(password.length >= 8 ){

            setPasswordValidation(true);

            axios.post('http://localhost:8089/api/signin',
                {
                    username: `${email}`,
                    password: `${password}`
                })
                .then((res)=>{
                    if (res.data){
                        localStorage.setItem('JWT', res.data.token);
                        navigate('/')
                    }
                }).catch(
                err=>{
                    setErrorMessage(true);
                })

        } else
        {
            setPasswordValidation(false);
        }

    }


  return (
    
    <div className='login-card'>
        <div className='content-wrapper'>

        <h2>Sign in to Task Manager</h2>

        <form className='login-form' onSubmit={handleSubmit}>

        <input type="email" placeholder='Enter email' className='inpt' onChange={e => setEmail(e.target.value)} required/>

        <input type="password" placeholder='Enter password' className='inpt' required
        
        onChange= {e => {
            setPassword(e.target.value)
        } }/>

            <button className='btn'>Sign in</button>

            {!passwordValidation ? <p className="errorMessage">Password must be at least 8 characters long.</p> : errorMessage && <p className="errorMessage">Invalid credentials.</p>}


            <p style={{color: "rgb(75, 89, 111)"}}>Don't have an account? <Link to="/signup">Sign up!</Link></p>
        </form>
        </div>
    </div>
  )
}

  