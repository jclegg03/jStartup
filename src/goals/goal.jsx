import React from 'react';
import { updateTimeLeft, resetTimer } from './time'

export function Goal(props) {
    const [timeLeft, setTimeLeft] = React.useState("")
    const [disabled, setDisabled] = React.useState(true)
    const [streak, setStreak] = React.useState(props.goal.streak)

    function update(timeLeft, disabled, streak) {
        setTimeLeft(timeLeft)
        setDisabled(disabled)
        setStreak(streak)
    }

    //instantly updates the time on load
    React.useEffect(() => {
        async function effect() {
            await updateTimeLeft(props.goal, update)
        }
        effect()
    })

    //updates the time at the specified interval
    setInterval(async () => await updateTimeLeft(props.goal, update), 1000 * 60)

    return (
        <li id={props.id} className='goal'>
            <span className="goal-text">{props.goal.goalText}</span>
            <span className="streak">({streak} {props.labels[0]} streak!)</span>
            <button className="delete btn btn-secondary" onClick={() => props.delete(props.goal.id)}>❌</button>
            <button className="reset btn btn-primary"
                disabled={disabled}
                onClick={() => resetTimer(props.goal, props.update)}>
                {timeLeft}
            </button>
        </li>
    );
}