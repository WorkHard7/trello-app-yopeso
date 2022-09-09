import React from 'react';
import "./Loading.scss";

function Loading() {
    return (
        <div className={"spinner-container"}>
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>

    );
}

export default Loading;