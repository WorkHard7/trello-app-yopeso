import React, {useState} from 'react'
import "./Password.scss"
import {Header} from '../../../components/Header/Header'
import {UserInfo} from "../../../components/Settings/UserInfo/UserInfo";
import {Navigation} from "../../../components/Settings/Navigation/Navigation";
import {useForm} from "react-hook-form";
import axios from "axios";


const Password = () => {

    const methods = useForm();

    const [status,setStatus] = useState();
    const [message,setMessage] = useState();

    const handleValidSubmit = (values) => {
        let data = {
            oldPassword: `${values.oldPassword}`,
            newPassword: `${values.newPassword}`,
            confirmPassword: `${values.repeatPassword}`
        }

        axios.patch('http://localhost:8089/api/settings/password',
            data,{
            headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('JWT') //the token is a variable which holds the token
                }
            })
            .then((res)=>{
                setStatus(res.status);
                methods.reset();
            })
            .catch((res) => {
                setStatus(res.status)
                setMessage(res.response.data.error);
            })
    }

    const active = 'non-active-link';
    const inactive = 'active-link';
    return (

        <section className="password-settings-section-container">
            <Header/>
            <UserInfo/>
            <Navigation inactive={inactive} active={active}/>

            <div className="form-wrapper">
                <h2>Change your password</h2>
                    <form className="password-change-form" onSubmit={methods.handleSubmit(handleValidSubmit)}>

                        <input className="inpt" type="password"
                               placeholder='Enter old password'
                               {...methods.register("oldPassword",{
                                   required: true,
                                   minLength:
                                       {
                                           value: 8,
                                           message: "Password must be at least 8 chars long."
                                       }
                               })}
                        />
                        <input className="inpt" type="password"
                               placeholder='Enter new password'
                               {...methods.register("newPassword",{
                                   required: true,
                                   minLength:
                                       {
                                           value: 8,
                                           message: "Password must be at least 8 chars long."
                                       }
                               })}/>
                        {methods.formState.errors["newPassword"] && <span className="errorMessage">{methods.formState.errors["newPassword"].message}</span>}

                        <input className="inpt" type="password"
                               placeholder='Repeat new password'
                               {...methods.register("repeatPassword", {
                                   required: true,
                                   validate: (val) => {
                                       if (methods.watch('newPassword') !== val) {
                                           return "Your passwords do not match.";
                                       }
                                   }
                               })}
                        />
                        {methods.formState.errors["repeatPassword"] && <span className="errorMessage">{methods.formState.errors["repeatPassword"].message}</span>}
                        {status && (status==200)?<p className={"succesfulMessage"}>Password saved succesfully!</p>:<p className={"errorMessage"}>{message}</p>}
                        <button className='btn'>Save</button>
                    </form>
            </div>

        </section>

    )

}

export default Password;
