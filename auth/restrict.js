const bcrypt = require('bcryptjs');
const model = require('./user-model.js');

module.exports = (req, res, next) => {
    const {username, password} = req.headers;

    model.findByUserName(username)
          .then(user => {
              if (user && bcrypt.compareSync(password, user.password)) {
                  next();
              } else {
                  res.status(403).json({err : 'not authorized'});
              }
          })
          .catch(err => {
              console.log(err);
              res.status(500).json({err: 'err verifying user'});
          });
}