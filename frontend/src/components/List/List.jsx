import React from "react";
import './List.scss';
import AddCardButton from "../AddCardButton/AddCardButton";
import axios from "axios";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const CREATE_CARD = ""

function List({list}) {

    const addCard = () => {
        console.log('clicked')

        axios.post()

    }

    return (
        <div className={'list-card'}>
            <div className={'list-title'}>
                <p>{list.title}</p>
                <div className={'edit-icon'}>
                    <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                </div>
            </div>
            <AddCardButton/>
        </div>
    );
}

export default List;