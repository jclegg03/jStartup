import React from 'react';
import { updateTime, resetTimer } from './time'

export function Goal(props) {
    return (
        <li id={props.id} className='goal'>
            <span className="goal-text">{props.goal.goalText}</span>
            <span className="streak">({props.goal.streak} {props.labels[0]} streak!)</span>
            <button className="delete btn btn-secondary" onClick={() => props.delete(props.goal.id)}>❌</button>
            <button className="reset btn btn-primary" onClick={() => resetTimer(props.goal.id, props.update)}>
                {updateTime(props.goal.date)} until reset
            </button>
        </li>
    );
}