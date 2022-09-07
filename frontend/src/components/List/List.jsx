import React from "react";
import './List.scss';
import AddCardButton from "../AddCardButton/AddCardButton";


function List() {
    return (
        <div className={'list-card'}>
            <div className={'list-title'}>
                <input type={'text'} placeholder={'Enter list title...'}/>
                <button>+</button>
            </div>
            <AddCardButton/>
        </div>
    );
}

export default List;