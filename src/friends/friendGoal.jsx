import React from "react";

export function FriendGoal(props)
{
    return (
        <p className="friend-goal">
                <span className='friend-goal-text'>{props.goal.goalText}</span>
                <span className="streak">({props.goal.streak} {props.labels[0]} streak!)</span>
            </p>
    )
}