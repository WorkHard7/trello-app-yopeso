import './LoginCard.scss'

import {FormProvider, useForm} from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import React, {useState} from 'react'
import {Input} from "../../components/Input/Input";
import axios from 'axios';


export const LoginCard = () => {

    const methods = useForm();
    
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState(false);


    const handleValidSubmit = (values) => {
            axios.post('http://localhost:8089/api/signin',
                {
                    username: `${values.email}`,
                    password: `${values.password}`
                })
                .then((res) => {
                    if (res.data.token) {
                        localStorage.setItem('JWT', res.data.token);
                        navigate('/')
                    }
                }).catch(
                ()=>{
                    setErrorMessage(true);
                })
    }

    return (

        <div className='login-card'>
            <div className='content-wrapper'>
        <h2>Sign in to Task Manager</h2>
        <FormProvider {...methods} >
            <form className='login-form' onSubmit={methods.handleSubmit(handleValidSubmit)}>
                <Input type="email" name="email" placeholder='Enter email'  validators={{ required: "Email is required." }}/>
                <Input type="password" name="password" placeholder='Enter password' validators={ { required: "Password is required", minLength: {value: 8, message: "Password must be at least 8 chars long."} }}/>
                <button className='btn'>Sign in</button>
                {errorMessage && <p className="errorMessage">Invalid credentials.</p>}
                <p style={{color: "rgb(75, 89, 111)"}}>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </form>
        </FormProvider>
        </div>
    </div>
  )
}