import React from 'react';

import SignUpForm from "./SignUpForm";
import './SignUpPage.scss';
import Logo from "../../components/Logo/Logo";


function SignUpPage() {
    return (
        <div className='signup-body'>
            <div className='signup-header'>
                <Logo/>
                <h1>Trello</h1>
            </div>
            <SignUpForm/>
        </div>
    )
}

export default SignUpPage;