import React from "react";
import './List.scss';
import AddCardButton from "../AddCardButton/AddCardButton";
import axios from "axios";

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
                <button>Edit</button>
            </div>
            <AddCardButton/>
        </div>
    );
}

export default List;