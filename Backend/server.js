var http = require('http');
const pathSetup = require('./path-setup');
const initControllers = require('./controllers');

const PORT = 5000;

const server = http.createServer(async (request, response) => {
    await pathSetup(request, response);
    await initControllers(request, response);
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
        "Access-Control-Max-Age": 2592000, // 30 days
        /** add other headers as per requirement */
      };

});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
    console.log(' ');
    
});