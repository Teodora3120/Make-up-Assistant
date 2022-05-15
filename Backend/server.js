var http = require('http');
const pathSetup = require('./path_setup');
const service = require('./api/service');

const PORT = 5000;

const server = http.createServer(async (request, response) => {
    await pathSetup(request, response);
    await service(request, response);
});

server.listen(PORT, () => {
    console.log(' ');
    console.log(`server started on port: ${PORT}`);
});