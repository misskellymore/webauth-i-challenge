const express = require('express');
const route = require('./auth/user-router.js');

const server = express();

server.use(express.json());
server.use('/auth', route);

module.exports = server;