import {Header} from "../../components/Header/Header";
import {Link, useNavigate} from "react-router-dom";
import {FormProvider, set, useForm} from "react-hook-form";
import {Input} from "../../components/Input/Input";
import axios from 'axios';
import './Settings.scss';
import {UserInfo} from "../../components/Settings/UserInfo/UserInfo";
import {Navigation} from "../../components/Settings/Navigation/Navigation";
import {useState} from "react";

const Settings = () => {

    const methods = useForm();
    const [message, setMessage] = useState(null);

    const handleValidSubmit = (values) => {

        const jwtToken = localStorage.getItem('JWT');

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtToken
        }

        axios.patch('http://localhost:8089/api/settings/general',
            {
                firstName: `${values.first_name}`,
                lastName: `${values.last_name}`
            }, {
                headers: headers
            }).then((res) => setMessage('Name was changed!'))
            .catch((err) => setMessage('Error during saving name'))
    }

    const active = 'active-link';
    const inactive = 'non-active-link';

    return (
        <>
            <Header/>
            <UserInfo/>
            <Navigation active={active} inactive={inactive}/>
            <div className='about-section'>
                <div className='content-about'>
                    <h2>Change your name</h2>
                    <div className={'line'}></div>
                    <FormProvider {...methods} >
                        <form className='about-form' onSubmit={methods.handleSubmit(handleValidSubmit)}>
                            <Input type="text" name="first_name" placeholder='Enter first name'
                                   validators={{required: "First name is required."}}/>
                            <Input type="text" name="last_name" placeholder='Enter last name' validators={{
                                required: "Last name is required",
                            }}/>

                            {message !== null ? <p style={{color: "red"}}>{message}</p> : ''}
                            <button className='btn'>Save</button>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </>
    )
}

export default Settings;