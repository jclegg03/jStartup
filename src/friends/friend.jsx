import React from "react";
import { FriendGoal } from "./friendGoal";

export function Friend(props) {
    const [goals, setGoals] = React.useState([])
    const [numGoals, setNumGoals] = React.useState("")
    React.useEffect(() => {
        fetch('/api/friend/goals?friend=' + props.name, {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((goalList) => updateGoals(goalList))
    }, [])

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
                <FriendGoal
                    goal={goal}
                    labels={labels}
                    key={goal.id}
                />
            )
        }

        setGoals(goalElements)
        if(goalElements.length == 1) setNumGoals("(1 goal)")
        else setNumGoals("(" + goalElements.length + " goals)")
    }

    return (
        <div id={props.id} className="friend">
            <span className='add-right-margin'>{props.name}</span>
            <span className='add-right-margin'>{numGoals}</span>
            {/* <span className='add-right-margin'>(going strong!)</span> */}
            {/* <span><button className="btn btn-primary">▼</button></span> */}
            {goals}
            <div className='remove-button'>
                <button className="btn btn-secondary" onClick={() => props.delete(props.id, props.name)}>Remove Friend</button>
            </div>
        </div>
    )
}