import React from 'react';
import './goals.css'
import { Goal } from './goal';

export function Goals(props) {
    const userName = props.userName
    const [goalText, setGoalText] = React.useState('')
    const [goalType, setGoalType] = React.useState('Daily')

    async function saveGoal()
    {
        const date = new Date().toLocaleDateString();
        const newGoal = {name: userName, goalText: goalText, goalType: goalType, streak: 0, date: date}

        updateGoalsLocal(newGoal)
    }

    function updateGoalsLocal(newGoal)
    {
        // goalList is used only to update the local storage.
        let goalList = []
        const goalsText = localStorage.getItem('goals')
        if(goalsText)
        {
            goalList = JSON.parse(goalsText)
        }

        goalList.push(newGoal)

        localStorage.setItem('goals', JSON.stringify(goalList))
    }

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
            <div id="add-goal">
                <div>
                    <button className="btn btn-primary" onClick={() => saveGoal()} disabled={!goalText}>+</button>
                    <input type="text" onChange={(e) => setGoalText(e.target.value)} placeholder="New Goal"/>
                    <select onChange={(e) => setGoalType(e.target.value)}>
                        <option>Daily</option>
                        <option>Weekly</option>
                    </select>
                </div>
            </div>
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