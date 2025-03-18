import React from "react";

export function Friend(props) {
    return (
        <div id={props.id} className="friend">
            <span className='add-right-margin'>{props.name}</span>
            <span className='add-right-margin'>1 goal</span>
            <span className='add-right-margin'>(going strong!)</span>
            <span><button className="btn btn-primary">▼</button></span>
            <p className="friend-goal">
                <span className='friend-goal-text'>Meet someone new daily</span>
                <span className="streak">(732 day streak!)</span>
            </p>
            <div className='remove-button'>
                <button className="btn btn-secondary" onClick={() => props.delete(props.id)}>Remove Friend</button>
            </div>
        </div>
    )
}