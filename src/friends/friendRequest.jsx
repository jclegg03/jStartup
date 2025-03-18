import React from "react";

export function FriendRequest(props) {
    return (
        <p className='friend-request'>
            <span className="request-name">{props.name}</span>
            <span className="options">
                <button onClick={() => props.add(props.name)} className="add-right-margin btn btn-primary">✅</button>
                <button className="btn btn-secondary">❌</button>
            </span>
        </p>
    )
}