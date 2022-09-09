import React, {useEffect, useState} from "react";
import './List.scss';
import AddCardButton from "../AddCardButton/AddCardButton";
import axios from "axios";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function List({board_id, token, list, cardInput, inputHandler, getAllLists}) {

    const [itemCardItems, setItemCardItems] = useState(list.tasks)

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
            })
    }

    const deleteList = () => {
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
            .finally(() => getAllLists(board_id, token))
    }

    return (
        <div className={'list-card'}>
            <div className={'list-title'}>
                <p>{list.title}</p>
                <div className={'edit-icon'}>
                    {/*<FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>*/}
                    <FontAwesomeIcon onClick={deleteList} icon={faTrash}></FontAwesomeIcon>
                </div>
            </div>
            {itemCardItems.map((card) => (
                <div className={'task-container'} key={card.id}>{card.title}</div>
            ))}
            <AddCardButton addCard={addCard} cardInput={cardInput} inputHandler={inputHandler}/>
        </div>
    );
}

export default List;