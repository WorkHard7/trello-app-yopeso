import React, {useEffect, useState} from 'react';
import {BsFillGrid3X3GapFill} from "react-icons/bs";
import {BsBell} from "react-icons/bs";
import {AiOutlineInfoCircle} from "react-icons/ai";
import Header1 from './Header.scss';

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export function Header() {

    const [data,setData] = useState([]);
    useEffect(() =>
            setData(parseJwt(localStorage.getItem('JWT')))
    ,[])

    return (
            <div className="header">
                <div className="logo">TaskManager
                </div>
                <div className="right-section">
                    <img
                        src={`https://ui-avatars.com/api/?background=random&name=${data['First name']}+${data['Last name']}&rounded=true`}/>
                </div>
            </div>

    );
}
