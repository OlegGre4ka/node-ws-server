const ws = require('ws');

const wss = new ws.Server({
    // port: process.env.PORT || 5000
    port: "https://ws-node-server.herokuapp.com/"
}, () => console.log(`Server started on 5000`))

console.log(wss,`wss`)
wss.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        message = JSON.parse(message)
        switch (message.event) {
            case 'message':
                broadcastMessage(message)
                break;
            case 'connection':
                broadcastMessage(message)
                break;
            default:
                break;
        }
    })
})

function broadcastMessage(message, id) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}