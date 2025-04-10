import React from 'react';
import './friends.css';
import { Notifications } from './notifications';
import { makeId } from '../goals/id'
import { Friend } from './friend'
import { FriendRequests } from './friendRequests'

export function Friends(props) {
    const [friends, setFriends] = React.useState([])
    const [friendName, setFriendName] = React.useState("")

    React.useEffect(() => {
        fetch('/api/friends', {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((list) => updateFriends(list))
    }, [])

    //used by the search friend section
    async function makeRequest() {
        const request = { name: friendName, id: makeId(), userName: props.userName }
        await fetch('/api/request', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(request),
        })
    }

    async function deleteFriend(id) {
        fetch('/api/friend', {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ user: props.userName, id: id})
        })
            .then((res) => res.json())
            .then((list) => updateFriends(list))
    }

    function updateFriends(friendList) {
        let friendElements = []
        for (let i = 0; i < friendList.length; i++) {
            let friend = friendList[i]
            let user1 = friend.name
            let user2 = friend.userName
            let name = (user1 === props.userName) ? user2 : user1
            friendElements.push(
                <Friend
                    name={name}
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
                {friends}
            </div>
            <div className="section">
                <div className="section">
                    <h2>Add friends</h2>
                    <div id="add">
                        <button className="btn btn-primary" disabled={!friendName} onClick={() => makeRequest()}>➕</button>
                        <input className="form-control" onChange={(e) => setFriendName(e.target.value)} type="text" placeholder="Enter Friend's username" />
                    </div>
                </div>
                <FriendRequests
                    updateFriends={(list) => updateFriends(list)}
                    userName={props.userName}
                />
            </div>
            <Notifications
                notifications={props.notifications}
                setNotifications={(notifications) => props.setNotifications(notifications)}
            />
        </main>
    );
}