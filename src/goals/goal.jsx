import React from 'react';
import { updateTimeLeft, resetTimer } from './time'

export function Goal(props) {
    const [timeLeft, setTimeLeft] = React.useState("")

    //instantly updates the time on load
    React.useEffect(() => updateTimeLeft(props.goal, setTimeLeft))

    //updates the time at the specified interval
    setInterval(() => updateTimeLeft(props.goal, setTimeLeft), 1000 * 60)

    return (
        <li id={props.id} className='goal'>
            <span className="goal-text">{props.goal.goalText}</span>
            <span className="streak">({props.goal.streak} {props.labels[0]} streak!)</span>
            <button className="delete btn btn-secondary" onClick={() => props.delete(props.goal.id)}>❌</button>
            <button className="reset btn btn-primary" onClick={() => resetTimer(props.goal.id, props.update)}>
                {timeLeft} until reset
            </button>
        </li>
    );
}