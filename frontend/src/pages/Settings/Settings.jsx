import {Header} from "../../components/Header/Header";
import {Link, useNavigate} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";
import {Input} from "../../components/Input/Input";
import axios from 'axios';
import './Settings.scss';
import {UserInfo} from "../../components/Settings/UserInfo/UserInfo";
import {Navigation} from "../../components/Settings/Navigation/Navigation";

const Settings = () => {

    const methods = useForm();

    const navigate = useNavigate();

    const handleValidSubmit = (values) => {
        axios.patch('http://localhost:8089/',
            {
                first_name: `${values.first_name}`,
                last_name: `${values.last_name}`
            })
            .then((res) => {
                if (res.data.token) {
                    localStorage.setItem('JWT', res.data.token);
                    navigate('/')
                }
            })
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
                            <button className='btn'>Save</button>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </>
    )
}

export default Settings;