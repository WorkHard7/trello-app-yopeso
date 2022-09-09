import React from "react";
import './BoardPage.scss';
import List from "../../components/List/List";
import {useParams} from 'react-router-dom';
import {Header} from "../../components/Header/Header";
import axios from "axios";
import {useEffect, useState} from "react";
import NewList from "../../components/List/NewList";
import Loading from "../../components/Loading/Loading";
import {defalutLists} from "./ApiCalls/ApiCalls";

function BoardPage() {
    const [displayNewList, setDisplayNewList] = useState(false);
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
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
        setUpdating(true);
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
            }).finally(() => {
                getAllLists(board_id, token)
                setDisplayNewList(false)
                setUpdating(false);
            }
        )
    }
    useEffect(() => getAllLists(board_id, token), [])
    const getAllLists = (boardId, token) => {
        setLoading(true);
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


    return (<>
        <Header/>
        {loading && <Loading/>}
        {!loading &&
            < div className={'board-page-container'}>
                <div className={'lists-container'}>
                    {lists.map((list, index) => (
                        <List getAllLists={getAllLists} token={token} board_id={board_id} cardInput={cardInput}
                              inputHandler={handleInputs}
                              key={list.id + index} list={list}/>
                    ))}

                    <NewList inputValue={titleInput} inputHandler={handleInputs} addList={addList}
                             displayNewList={displayNewList}
                             setDisplayNewList={setDisplayNewList}
                             updating={updating}/>
                </div>
            </div>
        }
    </>);
}

export default BoardPage;