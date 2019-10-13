const route = require('express').Router();
const model = require('./user-model.js');
const bcrypt = require('bcryptjs');


route.post('/register', (req, res) => {
    
    const {username, password} = req.headers;

    model.insert({username, password: bcrypt.hashSync(password, 2)})
          .then(id => {
              res.status(201).json(id);
          })
          .catch(err => {
              console.log(err);
              res.status(500).json({err: 'err registering user'});
          });
});


module.exports = route;