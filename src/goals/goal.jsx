import React from 'react';
import { updateTime, resetTimer } from './time'

export function Goal(props) {
    return (
        <li id={props.id} className='goal'>
            <span className="goal-text">{props.goal}</span>
            <span className="streak">({props.streak} {props.labels[0]} streak!)</span>
            <button className="delete btn btn-secondary" onClick={() => props.delete(props.id)}>❌</button>
            <button className="reset btn btn-primary" onClick={() => resetTimer(props.id, props.update)}>
                1 day 7 hours until reset
            </button>
        </li>
    );
}