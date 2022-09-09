import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Spinner} from "react-bootstrap";
import "./Loading.scss";

function Loading({size = 50}) {
    return (
        <div className={"spinner-container"}>
            <Spinner style={{width: size, height: size}} animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>

    );
}

export default Loading;