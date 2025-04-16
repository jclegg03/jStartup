import React from 'react'
import { FriendRequest } from './friendRequest';
import { makeId } from '../goals/id'

export function FriendRequests(props) {
    const [friendRequests, setFriendRequests] = React.useState([])
    let socket = props.socket
    socket.setUpdateRequests(() => {
        fetch('/api/request', {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((list) => updateRequests(list))
    })

    React.useEffect(() => {
        try {
            fetch('/api/request', {
                method: 'GET'
            })
                .then((res) => res.json())
                .then((list) => updateRequests(list))
        }
        catch (error) {

        }
    }, [])

    //used by the friend requests
    async function saveFriend(name, id) {
        const newFriend = { name: name, id: makeId(), userName: props.userName }
        const res = await fetch('/api/friend', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newFriend),
        })
        const friends = await res.json()
        props.updateFriends(friends)

        const message = {
            method: 'send',
            user: props.userName,
            to: name,
            type: socket.Events.UpdateFriends
        }
        socket.send(message)

        deleteFriendRequest(id)
    }

    function deleteFriendRequest(id) {
        fetch('/api/request', {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ user: props.userName, id: id})
        })
            .then((res) => res.json())
            .then((list) => updateRequests(list))
    }

    function updateRequests(list) {
        let requestElements = []
        for (let i = 0; i < list.length; i++) {
            let request = list[i]
            requestElements.push(
                <FriendRequest
                    key={request.id}
                    add={(name, id) => saveFriend(name, id)}
                    name={request.userName}
                    delete={(id) => deleteFriendRequest(id)}
                    id={request.id}
                />
            )
        }

        if(requestElements.length > 0) setFriendRequests(requestElements)
        else setFriendRequests("No friend requests … yet.")
    }

    return (
        <div className="section">
            <h3>Friend Requests</h3>
            {friendRequests}
        </div>
    )
}