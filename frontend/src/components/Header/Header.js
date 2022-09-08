import React, {useEffect, useState} from 'react';
import {BsFillGrid3X3GapFill} from "react-icons/bs";
import {BsBell} from "react-icons/bs";
import {AiOutlineInfoCircle} from "react-icons/ai";
import Header1 from './Header.scss';
import { Link } from "react-router-dom";
import extractPayload from "../../utils/extractPayload";


export function Header() {

    const [data,setData] = useState([]);
    useEffect(() =>
            setData(extractPayload(localStorage.getItem('JWT')))
    ,[])

    return (
            <div className="header">
                <Link to={"/"} style={{ textDecoration: 'none' }}>
                <div className="logo">TaskManager</div>
                </Link>
                <div className="right-section">
                    <Link to={"/settings/general"}>
                    <img
                        src={`https://ui-avatars.com/api/?background=random&name=${data['First name']}+${data['Last name']}&rounded=true`}/>
                    </Link>
                </div>
            </div>

    );
}
