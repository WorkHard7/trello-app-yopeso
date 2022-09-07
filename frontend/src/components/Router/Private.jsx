import {Navigate} from 'react-router-dom';

export function Private({children}){
    if(!localStorage.getItem('JWT'))
        return <Navigate replace to="/signin"/>

    return <>{children}</>
}