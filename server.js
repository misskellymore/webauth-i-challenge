const express = require('express');
const route = require('./auth/user-router.js');
const session = require('express-session');
const server = express();


const sessionConfig = {
    name: 'monkey',
    secret: 'keep it secret, keep it safe',
    cookie: {
        maxAge: 1000 * 30,
        // we want secure to be true in production but not in development
        secure: process.env.NODE_ENV === 'production' ? true : false,  
        httpOnly: true    
    },
    
    resave: false,
    saveUninitialized: false 
};

    

server.use(express.json());
// always put sessions directly under server.use(express.json());
server.use(session(sessionConfig));

server.use('/auth', route);
server.get('/', (req, res) => {

    res.json({api:'up'})

})



module.exports = server;