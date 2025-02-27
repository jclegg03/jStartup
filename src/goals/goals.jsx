import React from 'react';
import './goals.css'
import { Goal } from './goal';

export function Goals(props) {
    const userName = props.userName
    return (
        <main className="goals-main container-fluid bg-dark text-center">
            <h1 id="name">{userName}'s goals</h1>
            <ul id='goals'>
                <li className='goal'>
                    <span className="goal-text">Read the BOM daily</span>
                    <span className="streak">(2 day streak!)</span>
                    <button className="reset btn btn-primary">1 hour remaining</button>
                </li>
                <li className='goal'>
                    <span className="goal-text">Go on a date weekly</span>
                    <span className="streak">(7 week streak!)</span>
                    <button className="reset btn btn-primary" disabled>1 day 7 hours until reset</button>
                </li>
                <Goal
                    goal='Eat less'
                />
            </ul>
            <form id="add-goal" action="goals.html">
                <div>
                    <button className="btn btn-primary" type="submit">+</button>
                    <input type="text" placeholder="New Goal"/>
                    <select>
                        <option>Daily</option>
                        <option>Weekly</option>
                    </select>
                </div>
            </form>
            <div id="achievement">
                <h4>New Achievement</h4>
                <div>
                    <img id="achievement-image" src="Handshake.jpg"/>
                    Friendly
                    <button id="x-button" className="btn btn-primary">❌</button>
                </div>
                <p>Add a friend</p>
            </div>
        </main>
    );
}