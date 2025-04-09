import React from 'react'
import { FriendRequest } from './friendRequest';
import { makeId } from '../goals/id'

export function FriendRequests(props) {
    const [friendRequests, setFriendRequests] = React.useState([])
    
    let requests =
        [<FriendRequest
            name='Fred'
            add={(name, id) => saveFriend(name, id)}
            id={makeId()}
            delete={(id) => deleteFriendRequest(id)}
        />,
        <FriendRequest
            name='Jeff'
            add={(name, id) => saveFriend(name, id)}
            id={makeId()}
            delete={(id) => deleteFriendRequest(id)}
        />]

    React.useEffect(() => {
        try {
            setFriendRequests(requests)
        }
        catch (error) {

        }
    }, [])

    //used by the friend requests
    function saveFriend(name, id) {
        const newFriend = { name: name, id: makeId() }
        props.updateFriendsLocal(newFriend)
        deleteFriendRequest(id)
    }

    function deleteFriendRequest(id) {
        console.log(id)
        for (let i = 0; i < requests.length; i++) {
            let request = requests[i]
            let currentID = request.props.id
            console.log(currentID)
            if (currentID == id) {
                requests.splice(i, 1)
                break
            }
        }

        setFriendRequests(requests)
        console.log(requests)
        console.log(friendRequests)
    }

    return (
        <div className="section">
            <h3>Friend Requests</h3>
            {friendRequests}
        </div>
    )
}