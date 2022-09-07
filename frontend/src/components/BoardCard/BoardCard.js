import React from 'react';
import Board from './BoardCard.scss'

const BoardCard = ({board = {}, loading}) => {
    return (
        <div className={`board-card fade-in`}>
            <div className={`Board ${loading ? "skeleton" : ""}`} style={{backgroundColor: board.background_color || "#e6e6e6"}}>
                <div className={"board-title"}>{board.title}</div>
            </div>
        </div>
    );
};
export default BoardCard;
