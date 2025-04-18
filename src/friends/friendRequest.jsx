import React from "react";

export function FriendRequest(props) {
    return (
        <p className='friend-request'>
            <span className="request-name">{props.name}</span>
            <span className="options">
                <button onClick={() => props.add(props.name, props.id)} className="add-right-margin btn btn-primary">✅</button>
                <button onClick={() => props.delete(props.id)} className="btn btn-secondary">❌</button>
            </span>
        </p>
    )
}