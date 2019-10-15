const route = require('express').Router();
const model = require('./user-model.js');
const bcrypt = require('bcryptjs');
const resrict = require('./restrict.js');
;


// get users
route.get('/', resrict, (req, res) => {
    model.find()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: 'err getting users'})
    })

})


// sign up user
route.post('/register', (req, res) => {
    
    const {username, password} = req.body;

    model.insert({username, password: bcrypt.hashSync(password, 2)})
          .then(id => {
              res.status(201).json({message: 'user registered', id});
          })
          .catch(err => {
              console.log(err);
              res.status(500).json({err: 'err registering user'});
          });
});



// user login

route.post('/login', (req, res) => {
    
    const {username, password} = req.body;

    model.findByUserName({username})
          .first()
          .then(user => {
              if (user && bcrypt.compareSync(password, user.password)) {
                  req.session.user = user;
                  
                  res.status(200).json({message: 'you are logged in'});
              } else {
                  res.status(401).json({err : 'invalid username or password'});
              }
          })
          .catch(err => {
              console.log(err);
              res.status(500).json({err: 'err logging in user'});
          });
});


// logout user

route.get('/logout', (req, res) => {

    if (req.session) {
        req.session.destroy(err => {
            if(err) {
                res.json({message: 'cannout log out'})
            } else {
                res.status(200).json({message: 'logout successful'});
            }
        })
    } else {
        res.status(200).json({message: 'you were never here to begin with'})
    }
})


module.exports = route;