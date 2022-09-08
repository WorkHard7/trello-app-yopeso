import {Header} from "../../components/Header/Header";
import {Link, useNavigate} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";
import {Input} from "../../components/Input/Input";
import axios from 'axios';
import './Settings.scss';

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

    return (
        <>
            <Header/>
            <div className='about-section'>
                <div className='content-about'>
                    <h2>About</h2>
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