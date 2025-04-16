import React from 'react';
import './friends.css';
import { Notifications } from './notifications';
import { makeId } from '../goals/id'
import { Friend } from './friend'
import { FriendRequests } from './friendRequests'

export function Friends(props) {
    const [friends, setFriends] = React.useState([])
    const [friendName, setFriendName] = React.useState("")
    const [quote, setQuote] = React.useState("")
    const [source, setSource] = React.useState("")
    const notificationsRef = React.useRef()
    let socket = props.socket

    React.useEffect(() => {
        fetch('/api/friends', {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((list) => updateFriends(list))

        fetch("https://quotesondesign.com/wp-json/custom/v1/random-post?_=" + new Date().getTime())
            .then((res) => res.json())
            .then((data) => {
                setQuote(data.content.replace(/<[^>]*>/g, "")
                .replace(/&#821[67];/g, "'").replace(/&#822[01];/g, '"').replace(/&#8211;/g, "–")
                .replace(/&#8230;/g, "…")
            )
                setSource(data.title)
            })
        
            socket.setUserName(props.userName)
            socket.setUpdateFriends((message) => {
                fetch('/api/friends', {
                    method: 'GET'
                })
                    .then((res) => res.json())
                    .then((list) => updateFriends(list))
                
                notificationsRef.current?.addNotification(message)
            })
    }, [])

    //used by the search friend section
    async function makeRequest() {
        const request = { name: friendName, id: makeId(), userName: props.userName }
        fetch('/api/request', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(request),
        })

        const message = {
            method: 'send',
            user: props.userName,
            to: friendName,
            type: socket.Events.NewFriendRequest,
            message: props.userName + ' wants to be your friend!'
        }
        socket.send(message)
    }

    async function deleteFriend(id, user) {
        const message = {
            method: 'send',
            user: props.userName,
            to: user,
            type: socket.Events.UpdateFriends,
            message: props.userName + ' is no longer your friend.'
        }
        
        fetch('/api/friend', {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ user: props.userName, id: id})
        })
            .then((res) => res.json())
            .then((list) => updateFriends(list))
        
        socket.send(message)
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
                    delete={(id, user) => deleteFriend(id, user)}
                    key={friend.id}
                    socket={socket}
                />
            )
        }
        if(friendElements.length > 0) setFriends(friendElements)
        else setFriends("Send/Accept friend requests to see your friends goals!")
    }

    return (
        <main className="friends-main container-fluid bg-dark text-center">
            <h1>Friends</h1>
            <div className="section">
                {friends}
            </div>
            <div className="section">
                <div className="section">
                    <h2>Send Friend Requests</h2>
                    <div id="add">
                        <button className="btn btn-primary" disabled={!friendName} onClick={() => makeRequest()}>➕</button>
                        <input className="form-control" onChange={(e) => setFriendName(e.target.value)} type="text" placeholder="Enter Friend's username" />
                    </div>
                </div>
                <FriendRequests
                    updateFriends={(list) => updateFriends(list)}
                    userName={props.userName}
                    socket={socket}
                    notificationsRef={notificationsRef}
                />
            </div>
            <Notifications
                ref={notificationsRef}
            />
            <div className='section'>
                <p>{quote}</p>
                <p>- {source}</p>
                <p>
                    {"Quotes provided by "}
                    <a href='https://quotesondesign.com'>quotesondesign.com</a>
                </p>
            </div>
        </main>
    );
}