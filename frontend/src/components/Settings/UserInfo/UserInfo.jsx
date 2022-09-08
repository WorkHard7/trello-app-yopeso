import './UserInfo.scss'
import React, {useEffect, useState} from "react";
import extractPayload from "../../../utils/extractPayload";

export const UserInfo = () => {
    const [data,setData] = useState([]);
    useEffect(() =>
            setData(extractPayload(localStorage.getItem('JWT')))
        ,[])

    return (

        <header className="user-info-container">
            <ul className="user-info-list">
                <li>
                    <img src={`https://ui-avatars.com/api/?background=random&name=${data['First name']}+${data['Last name']}&rounded=true`}/>
                </li>
                <li>
                    <h2>{`${data['First name']} ${data['Last name']}`}</h2>
                </li>
                <li>
                    <p>{`${data['email']}`}</p>
                </li>

            </ul>

        </header>

    )

}