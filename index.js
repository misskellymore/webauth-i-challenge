const server = require('./server.js');

const port = 4242;

server.listen(port, () => console.log(`server listening on ${port}`));