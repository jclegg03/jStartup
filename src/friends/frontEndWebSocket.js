const Events =
{
    AddFriend: 'addFriend',
    RemoveFriend: 'removeFriend',
    NewFriendRequest: 'newFriendRequest'
}

class frontEndSocket {
    constructor(userName) {
        const user = userName
        let port = window.location.port
        const protocol = windoiw.location.protocol == 'http:' ? 'ws' : 'wss'
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`)

        this.socket.onopen = () => {
            const registration = { method: 'register', user: user }
            this.socket.send(JSON.stringify(registration))
        }

        this.socket.onmessage = (message) => {
            const data = JSON.parse(message.data)
            //do something
        }
    }
}