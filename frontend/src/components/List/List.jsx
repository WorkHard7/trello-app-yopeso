import React, {useEffect, useState} from "react";
import './List.scss';
import AddCardButton from "../AddCardButton/AddCardButton";
import axios from "axios";


function List({board_id, token, list, cardInput, inputHandler}) {

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
                getTask()
            })
            .catch((err) => {
                console.error(err)
            })
    }

    return (
        <div className={'list-card'}>
            <div className={'list-title'}>
                <p>{list.title}</p>
                <button>Edit</button>
            </div>
            {itemCardItems.map((card) => (
                <div key={card.id}>{card.title}</div>
            ))}
            <AddCardButton addCard={addCard} cardInput={cardInput} inputHandler={inputHandler}/>
        </div>
    );
}

export default List;