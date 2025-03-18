import React from 'react';
import './friends.css';
import { Notifications } from './notifications';
import { makeId } from '../goals/id'
import { Friend } from './friend'

export function Friends(props) {
    const [friends, setFriends] = React.useState([])
    const [friendName, setFriendName] = React.useState("")

    function saveFriend()
        {
            const newFriend = {name: friendName, id: makeId()}
            updateFriendsLocal(newFriend)
        }

        function saveFriend(name)
        {
            const newFriend = {name: name, id: makeId()}
            updateFriendsLocal(newFriend)
        }
    
        function deleteFriend(id)
        {
            // friendList is used only to update the local storage.
            let friendList = []
            const friendsText = localStorage.getItem('friends')
            if(friendsText)
            {
                friendList = JSON.parse(friendsText)
            }
    
            for(let i = 0; i < friendList.length; i++)
            {
                let friend = friendList[i]
                let currentID = friend.id
                if(currentID == id)
                {
                    friendList.splice(i, 1)
                    break
                }
            }
    
            localStorage.setItem('friends', JSON.stringify(friendList))
            updateFriends(friendList)
        }
    
        //Updates the stored friend data with the new friend.
        function updateFriendsLocal(newFriend)
        {
            // friendList is used only to update the local storage.
            let friendList = []
            const friendText = localStorage.getItem('friends')
            if(friendText)
            {
                friendList = JSON.parse(friendText)
            }
    
            friendList.push(newFriend)
    
            localStorage.setItem('friends', JSON.stringify(friendList))
            updateFriends(friendList)
        }
    
        function updateFriends(friendList)
        {
            let friendElements = []
            for(let i = 0; i < friendList.length; i++)
            {
                let friend = friendList[i]
                friendElements.push(
                    <Friend
                        name={friend.name}
                        id={friend.id}
                        delete={(id) => deleteFriend(id)}
                        key={friend.id}
                    />
                )
            }
            setFriends(friendElements)
        }
    
    return (
        <main className="friends-main container-fluid bg-dark text-center">
                <h1>Friends</h1>
                <div className="section">
                    <div className="friend">
                        <span className='add-right-margin'>Sally</span>
                        <span className='add-right-margin'>3 goals</span>
                        <span className='add-right-margin'>(going strong!)</span>
                        <span><button className="btn btn-primary">▼</button></span>
                        <p className="friend-goal">
                            <span className='friend-goal-text'>Run daily</span>
                            <span className="streak">(2 day streak!)</span>
                        </p>
                        <p className="friend-goal">
                            <span className='friend-goal-text'>Bike weekly</span>
                            <span className="streak">(1 week streak!)</span>
                        </p>
                        <p className="friend-goal">
                            <span className='friend-goal-text'>Consume no added sugars</span>
                            <span className="streak">(1 day streak!)</span>
                        </p>
                    </div>
                    <div className="friend">
                            <span className='add-right-margin'>Bob</span>
                            <span className='add-right-margin'>2 goals</span>
                            <span className='add-right-margin'>(needs encouragement)</span>
                            <span><button className="btn btn-primary">▼</button></span>
                        <p className="friend-goal">
                            <span className='friend-goal-text'>Meet someone new daily</span>
                            <span className="streak">(732 day streak!)</span>
                        </p>
                        <p className="friend-goal">
                            <span className='friend-goal-text'>Make home cooked meal daily</span>
                            <span className="streak">(3 hours remaining)</span>
                            <span className="encourage"><button className="btn btn-primary">Encourage</button></span>
                        </p>
                    </div>  
                    {friends} 
                </div>
                <div className="section">
                    <div className="section">
                        <h2>Add friends</h2>
                        <div id="add">
                            <button className="btn btn-primary" disabled={!friendName} onClick={() => saveFriend()}>➕</button>
                            <input className="form-control" onChange={(e) => setFriendName(e.target.value)} type="text" placeholder="Enter Friend's username"/>
                        </div>
                    </div>
                    <div className="section">
                        <h3>Friend Requests</h3>
                        <p>
                            <span className="request-name">Jeff</span>
                            <span className="options">
                                <button className="add-right-margin btn btn-primary">✅</button>
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