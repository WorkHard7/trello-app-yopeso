import React from 'react';
import {useFormContext} from "react-hook-form";
import './Input.scss'

export function Input({ validators, ...props}) {

    const {register, formState} =  useFormContext()
    return (
        <>
            <input className='inpt' {...props}  {...register(props.name, validators)}/>
            {formState.errors[props.name] && <span className="errorMessage">{formState.errors[props.name].message}</span>}
        </>
    );
}
