import React from 'react';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import SnackBar from "../../components/SnackBar/SnackBar";
import {useNavigate} from "react-router-dom";


function SignUpForm() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [displaySnackbar, setDisplaySnackbar] = useState(false)
    const [snackbarText, setSnackbarText] = useState('')
    const [invalidEmail, setInvalidEmail] = useState(0)

    const navigate = useNavigate();


    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const handleSnackbar = (text, display) => {
        setSnackbarText(text);
        setDisplaySnackbar(true)
        setTimeout(() => {
            handleDisplaySnackbar()
        }, 15000);
    }

    const handleDisplaySnackbar = () => {
        setDisplaySnackbar(false)
    }

    // const handlePostRequest = () => {
    const handleSubmit = () => {
        const capitalizedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
        const capitalizedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);

        if (capitalizedFirstName.length === 0 || capitalizedLastName.length === 0) {
            handleSnackbar('First name and last name must be completed', true)
        } else if (email.length === 0) {
            handleSnackbar('Email field is mandatory!', true)
        } else if (!isValidEmail(email)) {
            handleSnackbar('Email is invalid', true)
        } else if (password.length < 8) {
            handleSnackbar('Password must be at least 8 characters long', true)
        } else if (password !== confirmedPassword) {
            handleSnackbar('Passwords do not match', true)
        }

        console.log('Clicked')

        axios.post('http://localhost:8089/api/signup', {
            email: email, first_name: capitalizedFirstName, last_name: capitalizedLastName, password: password
        })
            .then((response) => {
                if (response.status === 200) {
                    return navigate('/signin')
                }
            })
            .catch(error => {
                if (error) {
                    console.error(error);
                    if (error.response.data === "Object(App\\Entity\\User).email:\n    Email is already taken. (code 23bd9dbf-6b9b-41cd-a99e-4844bcf3077f)\n") {
                        // setInvalidEmail(response.status)
                        return (handleSnackbar("Email is already taken!", true))
                    }
                }
            });
    }


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

    return (<div className='signup-card'>
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
               value={password} type={'password'}/>

        <label>Confirm Password</label>
        <input placeholder={'Confirm Password'} id={"passwordConfirmation"} onChange={handleInputs}
               value={confirmedPassword} type={'password'}/>

        <button onClick={handleSubmit}>Sign Up</button>

        <div className='redirect-login'>
            <h3>Already have an account?</h3>
            <Link to={'/signin'}>Sign in</Link>
        </div>
        <SnackBar handleDisplay={handleDisplaySnackbar} text={snackbarText} display={displaySnackbar}/>
    </div>);
}

export default SignUpForm;