const { WebSocketServer } = require('ws')

//This is fine to be stored on the server. If the server goes down, WS goes down so it is ok for it to be lost.
//All critical data is saved using the DB
const users = new Map()

function peerProxy(server) {
    const socketServer = new WebSocketServer({ server: server })

    socketServer.on('connection', (socket) => {
        socket.on('message', (message) => {
            const data = JSON.parse(message)

            //add user to registry of current users
            if (data.method == 'register') {
                users.set(data.user, socket)
                socket.user = data.user
            }

            if(data.method == 'send') {
                const otherSocket = users.get(data.to)
                if(otherSocket && otherSocket.readyState === WebSocket.OPEN) {
                    otherSocket.send(JSON.stringify(data))
                }
            }
        })

        socket.on('close', () => {
            users.delete(socket.user)
        })
    })
}

module.exports = {peerProxy}