import React, {useState} from "react";
import './AddCardButton.scss';
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function AddCardButton(){

    const [showTextArea, setShowTextArea] = useState(false);

    return(

        <div className="wrapper">
            {
                showTextArea && <div className="create-card-func">
                <textarea placeholder="Enter the task..." className={'task-textarea'}></textarea>
                <div className="create-card-btns">
                    <button className="add-card-btn">Add card</button>
                    <button className="decline-add-card" onClick={()=>setShowTextArea(false)}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>
            </div>
            }
            {
                !showTextArea && <div className="add-btn-container">
                <button onClick={()=>setShowTextArea(true)}>
                    <FontAwesomeIcon icon={faPlus} />
                    &nbsp;Add a card
                </button>
            </div>
            }

        </div>
    );
}

export default AddCardButton;