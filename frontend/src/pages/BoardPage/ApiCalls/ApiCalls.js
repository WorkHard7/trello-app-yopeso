import axios from "axios";
import {useState} from "react";

export const BoardColor = (param) => {
    const [color, setCollor] = useState('');

    axios.get()
}

export const defaultToDoList = (boardId, token) => {
    axios.post(`http://localhost:8089/api/boards/${boardId}/lists`, {
            title: 'To Do',
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
}

export const defaultDoingList = (boardId, token) => {
    axios.post(`http://localhost:8089/api/boards/${boardId}/lists`, {
            title: 'Doing',
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
}
export const defaultDoneList = (boardId, token) => {
    axios.post(`http://localhost:8089/api/boards/${boardId}/lists`, {
            title: 'Done',
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
}