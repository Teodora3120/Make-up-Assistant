var http = require('http');
const pathSetup = require('./path-setup');
const initControllers = require('./controllers');

const PORT = 5000;

const server = http.createServer(async (request, response) => {
    await pathSetup(request, response);
    await initControllers(request, response);
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
    console.log(' ');
});