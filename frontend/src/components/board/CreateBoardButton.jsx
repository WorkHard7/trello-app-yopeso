import './BoardButton.scss';
import React, {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";

const colors = ["#0079bf", "#d29034", "#519839", "#b04732", "#89609e"];

function Popup(props) {
    const [currentColor, setColor] = useState(colors[0]);
    const [inputMessage, setInputMessage] = useState('');
    const createBtn = useRef(null);

    const handleClick = (e) => {
        if (inputMessage.trim().length === 0) return
        props.navigate(`/board/id`)
    };

    useEffect(() => {
        if (inputMessage.trim().length === 0) {
            createBtn.current.style.backgroundColor = 'lightblue';
        } else {
            createBtn.current.style.backgroundColor = 'blue';
        }
    }, [inputMessage]);

    return (
        <div className="create-board-container">
            <div className="create-board">
                <h3 style={{color: currentColor}} className="create-board-title">Create board</h3>
                <div className="line"></div>
                <div className="create-board-bg">
                    <span className="create-board-background">Background</span>
                </div>
                <div className="color-blocks">
                    {colors.map((color) => (
                        <div key={color}
                             className={`color-block ${(color === currentColor) && "active" || "inactive"}`}
                             style={{backgroundColor: color}}
                             onClick={() => setColor(color)}
                        />
                    ))}
                </div>
                <form className="title-input">
                    <label className="board-title" htmlFor="board-title">Board title</label>
                    <input onChange={(e) => setInputMessage(e.target.value)} value={inputMessage} type='text'
                           className="board-title-input" placeholder='required field' autoFocus required/>
                    <button ref={createBtn} onClick={() => {
                        handleClick()
                    }} className="createBtn">Create
                    </button>
                </form>
            </div>
        </div>
    );
}


const CreateBoardButton = () => {
    const [popupIsVisible, SetTogglePopup] = useState(null);
    const navigate = useNavigate();

    return (
        <div className="create-board-main">
            <div className="create-board-top" onClick={() => SetTogglePopup(!popupIsVisible)}>
                <button className="create-board-btn">Create new board</button>
            </div>
            {popupIsVisible && <div className='fadeIn'><Popup navigate={navigate}/></div>}
            {popupIsVisible === false && <div className='fadeOut'><Popup/></div>}
        </div>
    );
}

export default CreateBoardButton;

