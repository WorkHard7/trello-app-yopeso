import axios from "axios";
import {useState} from "react";

export const BoardColor = (param) => {
    const [color, setCollor] = useState('');

    axios.get()
}

export const defalutLists = (boardId, token) => {
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