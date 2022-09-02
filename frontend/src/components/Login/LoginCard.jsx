import React from 'react'
import './LoginCard.scss'
import { useState } from 'react';

export const LoginCard = () => {

    const [passwordValidation, setPasswordValidation] = useState(0);



    const handleSubmit = (e) => {
      e.preventDefault();
    }


  return (
    
    <div className='login-card'>
        <div className='content-wrapper'>

        <h3>Log in to Trello</h3>

        <form className='login-form' onSubmit={handleSubmit}>

        <input type="email" placeholder='Enter email' className='inpt' required/>

        <input type="password" placeholder='Enter password' className='inpt' paswordrules="minlength:8" required 
        
        onChange= {e => setPasswordValidation(e.target.value.length)}/>

        {passwordValidation > 7 ? <p style={{color:"green"}}>Password looks good.</p> : passwordValidation === 0 ? <></> : <p style={{color:"red"}}>Password too short!</p>}
        <button className='btn'>Log in</button>

        </form>
        </div>
    </div>
  )
}

  