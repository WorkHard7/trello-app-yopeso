import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import extractPayload from "../../utils/extractPayload";
import './Header.scss'

export function Header() {

    const navigate = useNavigate();

    const [data,setData] = useState([]);
    useEffect(() =>
            setData(extractPayload(localStorage.getItem('JWT')))
    ,[])


    const handleLogout = () => {
        localStorage.removeItem("JWT");

        navigate('/signin');
    }

    return (
            <div className="header">
                <Link to={"/"} style={{ textDecoration: 'none' }}>
                <div className="logo">TaskManager</div>
                </Link>
                <div className="right-section">

                    <a onClick={handleLogout}><p>Log out</p></a>
                    <Link to={"/settings/general"} className="profile">
                    <img
                        src={`https://ui-avatars.com/api/?background=random&name=${data['First name']}+${data['Last name']}&rounded=true`}/>
                    </Link>

                </div>
            </div>

    );
}
