import React, {useEffect, useState} from "react";
import './List.scss';
import AddCardButton from "../AddCardButton/AddCardButton";
import axios from "axios";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Loading from "../Loading/Loading";

function List({board_id, token, list, cardInput, inputHandler, getAllLists}) {

    const [itemCardItems, setItemCardItems] = useState(list.tasks)
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);

    const getTask = () => {
        axios.get(`http://localhost:8089/api/boards/${board_id}/lists/${list.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                if (res && res.data) {
                    setItemCardItems(res.data.tasks)
                }
            })
            .catch((err) => {
                console.error(err)
            })
    }

    const addCard = () => {
        setUpdating(true);
        console.log("loading in addCard before post = ", loading);
        axios.post(`http://localhost:8089/api/boards/${board_id}/lists/${list.id}/items`, {
                title: cardInput
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then((res) => {
                // getAllLists()
                getTask()
            })
            .catch((err) => {
                console.error(err)
            }).finally(() => setUpdating(false))

    }

    const deleteList = () => {
        setLoading(true);
        axios.delete(`http://localhost:8089/api/boards/${board_id}/lists/${list.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then((res) => {
            })
            .catch((err) => {
                console.error(err)
            })
            .finally(() => {
                    getAllLists(board_id, token)
                    setLoading(false)
                }
            )

    }

    return (

        <div className={'list-card'}>

            {loading && <Loading/>}
            {!loading &&
                <div className={'list-title'}>
                    <p>{list.title}</p>
                    <div className={'edit-icon'}>
                        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                        <FontAwesomeIcon onClick={deleteList} icon={faTrash}></FontAwesomeIcon>
                    </div>
                </div>}

            {!loading && itemCardItems.map((card) => (
                <div className={'task-container'} key={card.id}>{card.title}</div>
            ))}
            {loading && itemCardItems && <Loading/>}
            <AddCardButton addCard={addCard} cardInput={cardInput} inputHandler={inputHandler} updating={updating}/>
        </div>
    )
        ;
}

export default List;