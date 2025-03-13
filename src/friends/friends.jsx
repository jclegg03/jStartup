import React from 'react';
import './friends.css';
import { Notifications } from './notifications';
import { makeId } from '../goals/id'

export function Friends(props) {
    const [friends, setFriends] = React.useState([])
    const [friendName, setFriendName] = React.useState("")

    function saveFriend()
        {
            const newFriend = {name: friendName, id: makeId()}
            console.log(newFriend)
            // updateGoalsLocal(newFriend)
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
                        delete={(id) => deleteGoal(id)}
                        key={goal.id}
                    />
                )
            }
            props.setGoals(goalElements)
        }
    
    return (
        <main className="friends-main container-fluid bg-dark text-center">
                <h1>Friends</h1>
                <div className="section">
                    <div className="friend">
                        <span>Sally</span>
                        <span>3 goals</span>
                        <span>(going strong!)</span>
                        <span><button className="btn btn-primary">▼</button></span>
                        <p className="friend-goal">
                            <span>Run daily</span>
                            <span className="streak">(2 day streak!)</span>
                        </p>
                        <p className="friend-goal">
                            <span>Bike weekly</span>
                            <span className="streak">(1 week streak!)</span>
                        </p>
                        <p className="friend-goal">
                            <span>Consume no added sugars</span>
                            <span className="streak">(1 day streak!)</span>
                        </p>
                    </div>
                    <div className="friend">
                            <span>Bob</span>
                            <span>2 goals</span>
                            <span>(needs encouragement)</span>
                            <span><button className="btn btn-primary">▼</button></span>
                        <p className="friend-goal">
                            <span>Meet someone new daily</span>
                            <span className="streak">(732 day streak!)</span>
                        </p>
                        <p className="friend-goal">
                            <span>Make home cooked meal daily</span>
                            <span className="streak">(3 hours remaining)</span>
                            <span className="encourage"><button className="btn btn-primary">Encourage</button></span>
                        </p>
                    </div>   
                </div>
                <div className="section">
                    <div className="section">
                        <h2>Add friends</h2>
                        <div id="add">
                            <button className="btn btn-primary" onClick={() => saveFriend()}>➕</button>
                            <input className="form-control" onChange={(e) => setFriendName(e.target.value)} type="text" placeholder="Enter Friend's username"/>
                        </div>
                    </div>
                    <div className="section">
                        <h3>Friend Requests</h3>
                        <p>
                            <span className="request-name">Jeff</span>
                            <span className="options">
                                <button className="btn btn-primary">✅</button>
                                <button className="btn btn-primary">❌</button>
                            </span>
                        </p>
                    </div>
                </div>
                <Notifications
                    notifications={props.notifications}
                    setNotifications={(notifications) => props.setNotifications(notifications)}
                />
            </main>
  );
}