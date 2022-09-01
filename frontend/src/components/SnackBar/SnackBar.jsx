import React from 'react';
import './SnackBar.scss'

function SnackBar({text, display, handleDisplay}) {

    if (display === false) {
        return
    }

    return (
        <div className='snackbar-container'>
            <p>{text}</p>
            <button onClick={handleDisplay}>x</button>
        </div>
    );
}

export default SnackBar;