import React from "react";
import './BoardPage.scss';
import List from "../../components/List/List";
import {useParams} from 'react-router-dom';
import {Header} from "../../components/Header/Header";
import axios from "axios";
import {useEffect, useState} from "react";
import NewList from "../../components/List/NewList";


function BoardPage() {
    const [displayNewList, setDisplayNewList] = useState(false);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('JWT');
    const [lists, setLists] = useState([])
    const {board_id} = useParams();

    // console.log('boardId--->', board_id)
    useEffect(() => {
        // console.log(token)
        const LISTS = `http://localhost:8089/api/boards/${board_id}/lists`

        axios
            .get(LISTS, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((res) => {
                console.log('res--->', res)
                if (res && res.data) {
                    return setLists(res.data)
                }
            })
            .catch((err) => {
                console.error(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if (loading) {
        return (
            <>
                <h3>Loading...</h3>
            </>
        )
    }
    return (<>
        <Header/>
        <div className={`${{loading} ? 'container':'board-page-container'}`}>
            <div className={'lists-container'}>
                {lists.map((list, index) => (
                    <List key={list.id + index} list={list}/>
                ))}
                <NewList displayNewList={displayNewList} setDisplayNewList={setDisplayNewList}/>
            </div>
        </div>
    </>);
}

export default BoardPage;