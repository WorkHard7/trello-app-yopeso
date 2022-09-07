import React from "react";
import './BoardPage.scss';
import List from "../../components/List/List";
import {useParams} from 'react-router-dom';
import {Header} from "../../components/Header/Header";
import axios from "axios";
import {useEffect, useState} from "react";

function BoardPage() {
    const [displayNewList, setDisplayNewList] = useState(false)
    const {board_id} = useParams();

    // console.log('boardId--->', board_id)


    return (
        <>
            <Header/>
            <div className={'board-page-container'}>
                <div className={'lists-container'}>
                    <List/>

                </div>
            </div>
        </>
    );
}

export default BoardPage;