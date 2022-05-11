const http = require('http');
const fs = require('fs');
const port = 5000;


const server = http.createServer(function (request, response) {
     fs.readFile('../Frontend/index.html', function (error, data) {
        response.setHeader( "Content-Type", "text/html");
            if (error) {
                response.writeHead(404);
                response.write('Error: File Not Found');
            } else {
              //  response.write(data);
              response.end(data);
            }
          
        })
})

server.listen(port, function (error) {
    if (error) {
        console.log('Something went wrong ', error);
    } else {
        
        console.log('Server is listening on port ' + port);
    }
});


