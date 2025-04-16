const Events =
{
    UpdateFriends: 'updateFriends',
    NewFriendRequest: 'newFriendRequest'
}

class FrontEndSocket {
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
            type = data.type
            if(type === Events.UpdateFriends) {
                this.updateFriends()
            }
            else if(type === Events.NewFriendRequest) {
                this.updateRequests()
            }
        }
    }

    setUpdateFriends(func) {
        this.updateFriends = func
    }

    setUpdateRequests(func) {
        this.updateRequests = func
    }
}

module.exports = {
    Events,
    FrontEndSocket
}