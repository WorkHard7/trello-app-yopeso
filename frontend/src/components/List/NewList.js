import React from 'react';
import './NewList.scss'

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
                <h3> + Add another list</h3>
            </div>
        </>);
    } else {

        return (<div className={'new-list-container'}>
            <input id={'titleInput'} value={inputValue} onChange={inputHandler} type={'text'}
                   placeholder={'Enter list title...'}/>
            <button onClick={closeAddList}>Close</button>
            <button onClick={addList}>Add</button>
        </div>)
    }
}

export default NewList;