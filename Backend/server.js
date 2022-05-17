var http = require('http');
const pathSetup = require('./path_setup');
const controller = require('./api/controller');

const PORT = 5000;

const server = http.createServer(async (request, response) => {
    await pathSetup(request, response);
    await controller(request, response);
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
    console.log(' ');
});