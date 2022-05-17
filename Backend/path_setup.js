var fs = require('fs');
var path = require('path');

const pathSetup = async (request, response) => {
    console.log('request endpoint', request.url);

    var filePath = '..' + request.url;

    if (filePath == '../') {
        filePath = '../Frontend/index.html';
    }
    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function (error, content) {
        //exclude api endpoints reading
        if (request.url.includes("/api")) {
            return;
        }
        if (error) {
            console.log(error);
            if (error.code == 'ENOENT') {
                fs.readFile('../Frontend/404.html', function (error2, content) {
                    console.log(error2);
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
}

module.exports = pathSetup;