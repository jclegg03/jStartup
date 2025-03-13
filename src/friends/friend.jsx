import React from "react";

export function Friend(props)
{
    return (
        <div id={props.id} className="friend">
            <span>{props.name}</span>
            <span>1 goal</span>
            <span>(going strong!)</span>
            <span><button className="btn btn-primary">▼</button></span>
        <p className="friend-goal">
            <span className='friend-goal-text'>Meet someone new daily</span>
            <span className="streak">(732 day streak!)</span>
        </p>
        <button onClick={() => props.delete(props.id)}>Remove Friend</button>
        </div>
    )
}