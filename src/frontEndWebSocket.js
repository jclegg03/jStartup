class FrontEndSocket {
    constructor() {
        this.Events =
        {
            UpdateFriends: 'updateFriends',
            NewFriendRequest: 'newFriendRequest',
            UpdateFriendGoals: 'updateFriendGoals'
        }
    }

    setUserName(userName) {
        const user = userName

        let port = window.location.port
        const protocol = window.location.protocol == 'http:' ? 'ws' : 'wss'
        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`)

        this.socket.onopen = () => {
            const registration = { method: 'register', user: user }
            this.socket.send(JSON.stringify(registration))
        }

        this.socket.onmessage = async (message) => {
            const data = JSON.parse(await message.data)
            //do something
            const type = data.type
            if (type === this.Events.UpdateFriends) {
                this.updateFriends()
            }
            else if (type === this.Events.NewFriendRequest) {
                this.updateRequests()
            }
            else if(type === this.Events.UpdateFriendGoals) {
                this.updateGoals()
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