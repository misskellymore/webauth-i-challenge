const db = require('../db/dbConfig.js');


function insert(user) {

    return (
        db('users').insert(user, 'id')
                .then(([id]) => id) 
    )

};

module.exports = {

};