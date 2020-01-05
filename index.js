// code away!
const express = require('express');
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

const server = express();

server.use(express.json());

server.use('/posts', postRouter);
server.use('/users', userRouter);

const port = 9000;
server.listen(port, () => console.log(`API running on port ${port}. Let the magic happen!`));
