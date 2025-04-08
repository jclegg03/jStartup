import React from 'react';

export function Deauth(props) {
    return (
    <div>
        <h1>Good Day!</h1>
        <p>{props.userName}</p>
        <button className="btn btn-secondary"  onClick={() => props.logout()}>
            Logout
        </button>
    </div>
    )
}