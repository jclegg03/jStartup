import React from 'react';

export function Goal(props)
{
    return(
        <li className='goal'>
            <span className="goal-text">{props.goal}</span>
            <span className="streak">(7 week streak!)</span>
            <button className="reset btn btn-primary" disabled>1 day 7 hours until reset</button>
        </li>
    );
}