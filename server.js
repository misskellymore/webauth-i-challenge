const express = require('express');
// const route = require('');

const server = express();

server.use(express.json());
// server.use('/api/auth', route);

module.exports = server;