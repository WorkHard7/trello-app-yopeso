import React from 'react'
import "./Password.scss"
import {Header} from '../../../components/Header/Header'
import {UserInfo} from "../../../components/Settings/UserInfo/UserInfo";
import {Navigation} from "../../../components/Settings/Navigation/Navigation";
import {useForm} from "react-hook-form";
import axios from "axios";


const Password = () => {

    const { register, formState: { errors }, handleSubmit, watch } = useForm();

    const onSubmit = (data) => console.log(data);


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
                    <form className="password-change-form" onSubmit={handleSubmit(onSubmit)}>

                        <input className="inpt" type="password"
                               placeholder="Enter the new password"
                               {...register("password", {
                            required: 'This field is required.',
                            minLength: {
                                value: 8,
                                message: "The password should be at least 8 characters long."
                            }
                        })} />
                        {errors["password"]?.message && <span className="errorMessage">{errors["password"]?.message}</span> }

                        <input className="inpt" type="password"
                               placeholder="Confirm the new password"
                               {...register("confirm-password", {
                            required: 'This field is required.',
                            validate:(val)=>{
                                if(watch("password")!== val){
                                    return 'Passwords do not match!'
                                }
                            }
                        })} />

                        {errors["confirm-password"]?.message && <span className="errorMessage">{errors["confirm-password"]?.message}</span> }

                        <button className='btn'>Save</button>
                    </form>
            </div>

        </section>

    )

}

export default Password;