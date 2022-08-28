const { Server } = require('ws');

const startWSServer = (server, port) => {
    const wss = new Server({ server });
    wss.on('connection', function connection(ws) {
        ws.on('message', function (message) {
            message = JSON.parse(message);
            console.log(message, port, "message in server")
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
    
    const broadcastMessage = (message, id) => {
        wss.clients.forEach(client => {
            client.send(JSON.stringify(message))
        })
    }
};

module.exports = startWSServer;


