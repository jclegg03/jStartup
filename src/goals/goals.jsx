import React from 'react';
import './goals.css'
import { Goal } from './goal';
import { makeId } from './id';

export function Goals(props) {
    const userName = props.userName
    const [goalText, setGoalText] = React.useState('')
    const [goalType, setGoalType] = React.useState('Daily')

    React.useEffect(() => {
        try {
            fetch('/api/goals', {
                method: 'GET'
            })
                .then((res) => res.json())
                .then((goalList) => updateGoals(goalList))
        }
        catch (error) {

        }
    }, [])

    async function saveGoal() {
        const day = 1000 * 60 * 60 * 24
        let date = new Date()
        if (goalType == "Daily") {
            date -= (day)
        }
        else {
            date -= (day * 7)
        }
        date = new Date(date)
        const newGoal = { name: userName, goalText: goalText, goalType: goalType, streak: 0, date: date, id: makeId() }

        fetch('/api/goal', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newGoal),
        })
            .then((res) => res.json())
            .then((goals) => updateGoals(goals))
    }

    async function deleteGoal(id) {
        fetch('/api/goal', {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ user: userName, id: id })
        })
            .then((res) => res.json())
            .then((goalList) => updateGoals(goalList))
    }

    function updateGoals(goalList) {
        let goalElements = []
        for (let i = 0; i < goalList.length; i++) {
            let goal = goalList[i]
            const type = goal.goalType
            const labels = ["", '']
            if (type === 'Daily') {
                labels[0] = 'day'
            }
            else if (type === 'Weekly') {
                labels[0] = 'week'
            }
            goalElements.push(
                <Goal
                    goal={goal}
                    labels={labels}
                    delete={(id) => deleteGoal(id)}
                    key={goal.id}
                    update={(goals) => updateGoals(goals)}
                />
            )
        }
        props.setGoals(goalElements)
    }

    return (
        <main className="goals-main container-fluid bg-dark text-center">
            <h1 id="name">{userName}'s goals</h1>
            <ul id='goals'>
                {
                    props.goals
                }
            </ul>
            <div id="add-goal">
                <div>
                    <button className="btn btn-primary" onClick={() => saveGoal()} disabled={!goalText}>+</button>
                    <input id="goals-input" type="text" onChange={(e) => setGoalText(e.target.value)} placeholder="New Goal" />
                    <select onChange={(e) => setGoalType(e.target.value)}>
                        <option>Daily</option>
                        <option>Weekly</option>
                    </select>
                </div>
            </div>
            {/* <div id="achievement">
                <h4>New Achievement</h4>
                <div>
                    <img id="achievement-image" src="Handshake.jpg"/>
                    Friendly
                    <button id="x-button" className="btn btn-primary">❌</button>
                </div>
                <p>Add a friend</p>
            </div> */}
        </main>
    );
}