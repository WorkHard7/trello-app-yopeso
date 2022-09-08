import React from 'react';
import {BsFillGrid3X3GapFill} from "react-icons/bs";
import {BsBell} from "react-icons/bs";
import {AiOutlineInfoCircle} from "react-icons/ai";
import Header1 from './Header.scss';

export function Header() {
    return (
            <div className="header">
                <div className="logo">TaskManager
                </div>
                <div className="right-section">
                    <img
                        src={'https://trello-members.s3.amazonaws.com/630dc0d0914cdf04a2bd0c74/248498a4988325aa830b8db52f5816a1/170.png'}/>
                </div>
            </div>

    );
}
