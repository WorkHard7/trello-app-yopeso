import './BoardButton.scss';
import React, {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';

function PopUpForm(props) {
    const [currentColor, setColor] = useState(colors[0]);
    const [inputTitle, setInputTitle] = useState('');
    const createBtn = useRef(null);


    const handleClick = (e) => {
        if (inputTitle.trim().length === 0) return
        createBoard(inputTitle, colorToName.get(currentColor))
            .then((res) => res.data.id)
            .then((id) => props.navigate(`/board/` + id))
            .catch(err => {
                if(err.response.status === 401){
                    props.navigate(`/signin`);
                }
            })
    };

    useEffect(() => {
        if (inputTitle.trim().length === 0) {
            createBtn.current.style.backgroundColor = 'lightblue';
        } else {
            createBtn.current.style.backgroundColor = 'blue';
        }
    }, [inputTitle]);

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
                <div className="title-input">
                    <label className="board-title" htmlFor="board-title">Board title</label>
                    <input onChange={(e) => setInputTitle(e.target.value)} value={inputTitle} type='text'
                           className="board-title-input" placeholder='required field' autoFocus required/>
                    <button ref={createBtn} onClick={() => {
                        handleClick()
                    }} className="createBtn">Create
                    </button>
                </div>
            </div>
        </div>
    );
}

const colors = ["#0079bf", "#d29034", "#519839", "#b04732", "#89609e"];

const colorToName = new Map([
    ['#0079bf', 'blue'],
    ['#d29034', 'orange'],
    ['#519839', 'green'],
    ['#b04732', 'red'],
    ['#89609e', 'violet']
])

const createBoard = (title, color) => {

    const jwtToken = localStorage.getItem('JWT');

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwtToken
    }

    const requestBody = {title, color};
    const url = 'http://localhost:8089/api/boards';

    return axios.post(`${url}`, requestBody, {
        headers: headers
    })
}


const CreateNewBoard = () => {
    const [popupIsVisible, SetTogglePopup] = useState(null);
    const navigate = useNavigate();

    return (
        <div className="create-board-main">
            <div className="create-board-top" onClick={() => SetTogglePopup(!popupIsVisible)}>
                <button className="create-board-btn">Create new board</button>
            </div>
            {popupIsVisible && <div className='fadeIn'><PopUpForm navigate={navigate}/></div>}
            {popupIsVisible === false && <div className='fadeOut'><PopUpForm/></div>}
        </div>
    );
}

export default CreateNewBoard;

