const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const usersRouter = require('./users/users-router');
const tripsRouter = require('./trips/trips-router');
const path = require('path');

const server = express();
const corsConfig = {};

server.use(helmet());
server.use(express.json());
server.use(cors(corsConfig));

server.use('/users', usersRouter);
server.use('/trips', tripsRouter);

server.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname + '/apidoc/index.html'));
});



module.exports = server;
