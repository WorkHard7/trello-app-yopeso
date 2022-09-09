import React from 'react';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import SnackBar from "../../components/SnackBar/SnackBar";
import {useNavigate} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";
import {Input} from "../../components/Input/Input";


function SignUpForm() {

    const [invalidEmail, setInvalidEmail] = useState(false)
    const navigate = useNavigate();
    const methods = useForm();

    const pwdConfirmation = (confirmPwd,) => {
        if (methods.getValues().password === confirmPwd) {
            return null
        }
        return "Passwords do not match"
    }


    const handleApiCall = (values) => {
        // console.log('clicked')
        const capitalizedFirstName = values.firstName.charAt(0).toUpperCase() + values.firstName.slice(1);
        const capitalizedLastName = values.lastName.charAt(0).toUpperCase() + values.lastName.slice(1);

        axios.post('http://localhost:8089/api/signup', {
            email: values.email,
            first_name: capitalizedFirstName,
            last_name: capitalizedLastName,
            password: values.password
        })
            .then((response) => {
                if (response.status === 200) {
                    // console.log(response)
                    return navigate('/signin')
                }
            })
            .catch(error => {
                if (error) {
                    console.error(error);
                    if (error.response.data.email[0] === 'Email is already taken.') {
                        setInvalidEmail(true)
                    }
                }
            });
    }

    return (<div className='signup-card'>

        <h2>Sign up for your account</h2>
        <FormProvider {...methods}>

            <form onSubmit={methods.handleSubmit(handleApiCall)}>

                <Input type="text" name="firstName" placeholder='Enter first name'
                       validators={{required: "First name is required"}}/>

                <Input type="text" name="lastName" placeholder='Enter last name'
                       validators={{required: "Last name is required"}}/>

                <Input type="email" name="email" placeholder='Enter email'
                       validators={{required: "Email is required"}}/>
                {invalidEmail && <span className="errorMessage">Email is already taken</span>}

                <Input type="password" name="password" placeholder='Enter password'
                       validators={{
                           required: "Password is required",
                           minLength: {value: 8, message: "Password must be at least 8 chars long"}
                       }}/>

                <Input type="password" name="confirmationPassword" placeholder='Confirm password'
                       validators={{
                           required: "Password confirmation is required",
                           validate: {doesNotMatch: pwdConfirmation}
                       }}/>

                <button className='btn'>Sign up</button>

                <p style={{color: "rgb(75, 89, 111)", alignSelf: "center"}}>Already have an account? <Link to="/signin">Sign
                    in</Link></p>
            </form>

        </FormProvider>
    </div>);
}

export default SignUpForm;