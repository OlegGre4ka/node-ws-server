const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const authRouter = require('./routers/authRouter');
const startWSServer = require("./websocket");
const errorMiddleware = require("./middlewares/errorMiddleWare");

const PORT = process.env.PORT || 5000;

const app = express();
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use(express.json());
app.use(cookieParser())
app.use(cors(corsOptions));
app.use("/auth", authRouter);
app.use(errorMiddleware);

const start = async() => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const server = app.listen(PORT, () => console.log(`Express server listening on ${PORT}`));
        startWSServer(server, PORT);
        return
    } catch (e) {
        console.log(e)
    }
}

start();







