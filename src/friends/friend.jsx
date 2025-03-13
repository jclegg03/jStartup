import React from "react";

export function Friend(props)
{
    return (
        <div id={props.id} className="friend">
            <span>{props.name}</span>
            <span>2 goals</span>
            <span>(needs encouragement)</span>
            <span><button className="btn btn-primary">▼</button></span>
        <p className="friend-goal">
            <span>Meet someone new daily</span>
            <span className="streak">(732 day streak!)</span>
        </p>
        </div>
    )
}