import React, {useState} from 'react'
import "./Password.scss"
import {Header} from '../../../components/Header/Header'
import {UserInfo} from "../../../components/Settings/UserInfo/UserInfo";
import {Navigation} from "../../../components/Settings/Navigation/Navigation";

import {FormProvider, useForm, useFormContext} from "react-hook-form";
import axios from "axios";


const Password = () => {

    const methods = useForm();

    const {watch, register, formState} = useForm();

    const handleValidSubmit = (values) => {

        axios.patch('http://localhost:8089/api/signin',
            {
                password: `${values.password}`
            })
            .then((res) => {
                console.log(res);
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
                <FormProvider {...methods} >
                    <form className="password-change-form" onSubmit={methods.handleSubmit(handleValidSubmit)}>
                        <input className="inpt" type="password"
                               placeholder='Enter new password'
                               {...register("newPassword",{
                                   required: true,
                                   minLength:
                                       {
                                           value: 8,
                                           message: "Password must be at least 8 chars long."
                                       }
                               })}/>
                        {formState.errors["newPassword"] && <span className="errorMessage">{formState.errors["newPassword"].message}</span>}

                        <input className="inpt" type="password"
                               placeholder='Repeat new password'
                               {...register("repeatPassword", {
                                   required: true,
                                   validate: (val) => {
                                       if (watch('newPassword') !== val) {
                                           return "Your passwords do no match";
                                       }
                                   }
                               })}
                        />
                        {formState.errors["repeatPassword"] && <span className="errorMessage">{formState.errors["repeatPassword"].message}</span>}

                        <button className='btn'>Save</button>
                    </form>
                </FormProvider>
            </div>

        </section>

    )

}

export default Password;