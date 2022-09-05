import React, { useState } from 'react'
import './LoginCard.scss'
import axios from 'axios';
import {useNavigate} from "react-router-dom";

export const LoginCard = () => {

    const navigate = useNavigate();

    const [passwordValidation, setPasswordValidation] = useState(0);



    const handleSubmit = (e) => {
      e.preventDefault();
        axios.post('http://localhost:8089/api/signin',
            {
                username: 'gg@gmail.com',
                password: '012343210'
            })
            .then((res)=>{
                if(res.status === 204){
                    console.log(res);
                } else {
                    console.log('Error');
                }
            })

    }


  return (
    
    <div className='login-card'>
        <div className='content-wrapper'>

        <h2>Log in to Trello</h2>

        <form className='login-form' onSubmit={handleSubmit}>

        <input type="email" placeholder='Enter email' className='inpt' required/>

        <input type="password" placeholder='Enter password' className='inpt' required
        
        onChange= {e => setPasswordValidation(e.target.value.length)}/>

        {passwordValidation > 7 ? <p style={{color:"green"}}>Password looks good.</p> : passwordValidation === 0 ? <></> : <p style={{color:"red"}}>Password too short!</p>}
            <button className='btn'>Log in</button>

        </form>
        </div>
    </div>
  )
}

  