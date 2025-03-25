import React from 'react';
import './goals.css'
import { Goal } from './goal';
import { makeId } from './id';

export function Goals(props) {
    const userName = props.userName
    const [goalText, setGoalText] = React.useState('')
    const [goalType, setGoalType] = React.useState('Daily')
    
    React.useEffect(() => {
        let goals = []
        try 
        {
            goals = JSON.parse(props.goals)
            updateGoals(goals)
        }
        catch (error)
        {
            
        }
    },[])

    function saveGoal()
    {
        const date = new Date().toUTCString()
        const newGoal = {name: userName, goalText: goalText, goalType: goalType, streak: 0, date: date, id: makeId()}

        updateGoalsLocal(newGoal)
    }

    function deleteGoal(id)
    {
        // goalList is used only to update the local storage.
        let goalList = []
        const goalsText = localStorage.getItem('goals')
        if(goalsText)
        {
            goalList = JSON.parse(goalsText)
        }

        for(let i = 0; i < goalList.length; i++)
        {
            let goal = goalList[i]
            let currentID = goal.id
            if(currentID == id)
            {
                goalList.splice(i, 1)
                break
            }
        }

        localStorage.setItem('goals', JSON.stringify(goalList))
        updateGoals(goalList)
    }

    //Updates the stored goal data with the new goal.
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
        updateGoals(goalList)
    }

    function updateGoals(goalList)
    {
        let goalElements = []
        for(let i = 0; i < goalList.length; i++)
        {
            let goal = goalList[i]
            const type = goal.goalType
            const labels = ["", '']
            if(type === 'Daily')
            {
                labels[0] = 'day'
            }
            else if(type === 'Weekly')
            {
                labels[0] = 'week'
            }
            goalElements.push(
                <Goal
                    goal={goal.goalText}
                    labels={labels}
                    id={goal.id}
                    streak={goal.streak}
                    delete={(id) => deleteGoal(id)}
                    date={goal.date}
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
                    <input type="text" onChange={(e) => setGoalText(e.target.value)} placeholder="New Goal"/>
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