import React from 'react';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

function SignUpForm() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')

    // console.log('f n--->', firstName);
    // console.log('l n--->', lastName);
    // console.log('em--->', email);
    // console.log('pwd--->', password);
    // console.log('c pwd--->', confirmedPassword);

    const handleInputs = (e) => {
        e.preventDefault();
        const {id, value} = e.target;
        if (id === 'firstName') {
            setFirstName(value)
        }
        if (id === 'lastName') {
            setLastName(value)
        }
        if (id === 'email') {
            setEmail(value)
        }
        if (id === 'password') {
            setPassword(value)
        }
        if (id === 'passwordConfirmation') {
            setConfirmedPassword(value)
        }
    }

    return (
        <div className='signup-card'>
            <h2>Sign up for your account</h2>
            <label>First Name</label>
            <input placeholder={'First Name'} id={'firstName'} onChange={handleInputs}
                   value={firstName} type={'text'}/>
            <label>Last Name</label>
            <input placeholder={'Last Name'} id={'lastName'} onChange={handleInputs}
                   value={lastName} type={'text'}/>
            <label>Email</label>
            <input placeholder={'Enter Email'} id={'email'} onChange={handleInputs}
                   value={email} type={'text'}/>
            <label>Password</label>
            <input placeholder={'Enter Password'} id={"password"} onChange={handleInputs}
                   value={password} type={'text'}/>
            <label>Confirm Password</label>
            <input placeholder={'Confirm Password'} id={"passwordConfirmation"} onChange={handleInputs}
                   value={confirmedPassword} type={'text'}/>
            <button>Sign Up</button>
            <div className='redirect-login'>
                <h3>Already have an account?</h3>
                <Link to={'/login'}>Sign in</Link>
            </div>
        </div>
    );
}

export default SignUpForm;