// code away!
require('dotenv').config();

const express = require('express');
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

const server = express();

server.use(express.json());

/*
logger()
    logger logs to the console the following information about each request: request method, request url, and a timestamp
    this middleware runs on every request made to the API
 */

function logger(req, res, next) {
    console.log(
        `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('host')}`
    );
    next();
}

server.use(logger);
server.use('/posts', postRouter);
server.use('/users', userRouter);
server.get('/', (req, res) => {
    res.send('Welcome to The Hobbit Blog');
});

const port = process.env.PORT || 9000;
server.listen(port, () => console.log(`API running on port ${port}. Let the magic happen!`));
