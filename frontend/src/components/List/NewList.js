import React from 'react';
import './NewList.scss';
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function NewList({displayNewList, setDisplayNewList, addList, inputHandler, inputValue}) {

    const showAddList = () => {
        setDisplayNewList(true)
    }
    const closeAddList = () => {
        setDisplayNewList(false)
    }

    if (displayNewList === false) {
        return (<>
            <div className={'new-list-container'} onClick={showAddList}>
                <span className={'create-list-btn'}> + Add another list</span>
            </div>
        </>);
    } else {
        return (
            <div className={'new-list-container'}>
                <input className={'list-name-field'} id={'titleInput'} value={inputValue} onChange={inputHandler}
                       type={'text'}
                       placeholder={'Enter list title...'}/>
                <div className={'create-list-btns'}>
                    <button className={'add-list-btn'} onClick={addList}>Add list</button>
                    <button className={'close-add-list-btn'} onClick={closeAddList}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </button>
                </div>
            </div>
        )
    }
}

export default NewList;