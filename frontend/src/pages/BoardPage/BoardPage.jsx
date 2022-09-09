import React from "react";
import './BoardPage.scss';
import List from "../../components/List/List";
import {useParams} from 'react-router-dom';
import {Header} from "../../components/Header/Header";
import axios from "axios";
import {useEffect, useState} from "react";
import NewList from "../../components/List/NewList";
import {defaultToDoList} from "./ApiCalls/ApiCalls";

function BoardPage() {
    const [displayNewList, setDisplayNewList] = useState(false);
    const [loading, setLoading] = useState(true);
    const [titleInput, setTitleInput] = useState('');
    const [cardInput, setCardInput] = useState('')
    const token = localStorage.getItem('JWT');
    const [lists, setLists] = useState([])
    const {board_id} = useParams();

    const handleInputs = (e) => {
        e.preventDefault();
        const {id, value} = e.target;
        if (id === 'titleInput') {
            setTitleInput(value)
        }
        if (id === 'cardInput') {
            setCardInput(value)
        }
    }

    const addList = () => {
        if (titleInput.length === 0) {
            return setDisplayNewList(false)
        }
        axios.post(`http://localhost:8089/api/boards/${board_id}/lists`, {
                title: titleInput,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then((res) => {
                console.log(res)

            })
            .catch((err) => {
                console.error(err)
            })
        setDisplayNewList(false)
    }
    const getAllLists = (boardId, token) => {
        axios
            .get(`http://localhost:8089/api/boards/${board_id}/lists`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((res) => {
                if (res && res.data) {
                    // console.log(res)
                    return setLists(res.data)
                }
            })
            .catch((err) => {
                console.error(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    useEffect(() => {
        // defaultToDoList(board_id, token);
        getAllLists(board_id, token)
    }, [titleInput])


    //----------------------
    if (loading) {
        return (
            <>
                <h3>Loading...</h3>
            </>
        )
    }
    return (<>
        <Header/>
        <div className={'board-page-container'}>
            <div className={'lists-container'}>
                {lists.map((list, index) => (
                    <List getAllLists={getAllLists} token={token} board_id={board_id} cardInput={cardInput}
                          inputHandler={handleInputs}
                          key={list.id + index} list={list}/>
                ))}
                <NewList inputValue={titleInput} inputHandler={handleInputs} addList={addList}
                         displayNewList={displayNewList}
                         setDisplayNewList={setDisplayNewList}/>
            </div>
        </div>
    </>);
}

export default BoardPage;