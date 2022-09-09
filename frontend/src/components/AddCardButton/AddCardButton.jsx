import React, {useState} from "react";
import './AddCardButton.scss';
import {faXmark, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";

function AddCardButton({inputHandler, cardInput, addCard, updating}) {

    const [showTextArea, setShowTextArea] = useState(false);


    return (

        <div className="wrapper">
            {
                showTextArea && <div className="create-card-func">
                    <textarea
                        id={'cardInput'} value={cardInput} onChange={inputHandler} placeholder="Enter the task..."
                        className={'task-textarea'} disabled={updating}></textarea>
                    <div className="create-card-btns">
                        <button className="add-card-btn" onClick={addCard} disabled={updating}>Add card</button>
                        <button className="decline-add-card" onClick={() => setShowTextArea(false)} disabled={updating}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </button>
                    </div>
                </div>
            }
            {
                !showTextArea && <div className="add-btn-container">
                    <button className={'add-btn'} onClick={() => setShowTextArea(true)}>
                        <FontAwesomeIcon icon={faPlus}/>
                        &nbsp;Add a card
                    </button>
                </div>
            }

        </div>
    );
}

export default AddCardButton;