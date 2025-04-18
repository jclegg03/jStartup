class FrontEndSocket {
    constructor() {
        this.Events =
        {
            UpdateFriends: 'updateFriends',
            NewFriendRequest: 'newFriendRequest',
            UpdateFriendGoals: 'updateFriendGoals'
        }
        this.active = false
    }

    setUserName(userName) {
        this.active = true
        const user = userName

        let port = window.location.port
        const protocol = window.location.protocol == 'http:' ? 'ws' : 'wss'
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`)

        this.socket.onopen = () => {
            const registration = { method: 'register', user: user }
            this.socket.send(JSON.stringify(registration))
        }

        this.socket.onmessage = (message) => {
            const data = JSON.parse(message.data)
            const type = data.type
            if (type === this.Events.UpdateFriends) {
                this.updateFriends(data.message)
            }
            else if (type === this.Events.NewFriendRequest) {
                this.updateRequests(data.message)
            }
            else if (type === this.Events.UpdateFriendGoals) {
                this.updateGoals(data.message)
            }
        }
    }

    setUpdateFriends(func) {
        this.updateFriends = func
    }

    setUpdateRequests(func) {
        this.updateRequests = func
    }

    setUpdateGoals(func) {
        this.updateGoals = func
    }

    send(data) {
        this.socket.send(JSON.stringify(data))
    }
}


let socket = new FrontEndSocket()
export {
    socket
}