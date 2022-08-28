const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const authRouter = require('./routers/authRouter');
const startWSServer = require("./websocket");

const PORT = process.env.PORT || 5000;

const app = express();
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use(express.json());
app.use(cookieParser())
// app.use(cors(corsOptions));
app.use(cors());

// app.use("/");
app.use("/auth", authRouter);
console.log(process.env.PORT, process.env.DB_URL, "PORT-process.env.DB_URL")
// mongoose.connect(process.env.DB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
// const server = app.listen(PORT, () => console.log(`Express server listening on ${PORT}`));
// startWSServer(server, PORT);
const start = async() => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const server =  await app.listen(PORT, () => console.log(`Express server listening on ${PORT}`));
        await startWSServer(server, PORT);
    } catch (e) {
        console.log(e)
    }
}

start();









// const express = require('express');
// const { Server } = require('ws');

// const PORT = process.env.PORT || 5000;

// const server = express().listen(PORT, () => console.log(`Listening on ${PORT}`));

// const wss = new Server({ server });

// wss.on('connection', function connection(ws) {
//     ws.on('message', function (message) {
//         message = JSON.parse(message)
//         switch (message.event) {
//             case 'message':
//                 broadcastMessage(message)
//                 break;
//             case 'connection':
//                 broadcastMessage(message)
//                 break;
//             default:
//                 break;
//         }
//     })
// })

// function broadcastMessage(message, id) {
//     wss.clients.forEach(client => {
//         client.send(JSON.stringify(message))
//     })
// }