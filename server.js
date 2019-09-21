const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const usersRouter = require('./users/users-router');
const tripsRouter = require('./trips/trips-router');

const server = express();
const corsConfig = {};

server.use(helmet());
server.use(express.json());
server.use(cors(corsConfig));

server.use('/users', usersRouter);
server.use('/trips', tripsRouter);



module.exports = server;
