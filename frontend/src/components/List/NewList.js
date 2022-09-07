import React from 'react';

function NewList({displayNewList, setDisplayNewList}) {


    return (
        <div onClick={setDisplayNewList(true)}>
            <h1> + Add another list</h1>
        </div>
    );
}

export default NewList;