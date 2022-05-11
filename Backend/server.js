/* const http = require('http');
const fs = require('fs');
const path=require('path');
const textpath='../Frontend/index.html';
const port = 5000;

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm',
    '.xml' : 'text/xml',
};

console.log("ALOOOOOOO "+ path.extname(textpath))
const contentType = mimeTypes[path.extname(textpath)];
const server = http.createServer(function (request, response) {
     fs.readFile('../Frontend/index.html', function (error, data) {
        response.setHeader( "Content-Type", contentType);
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
}); */

/* var pug = require('pug');
const fs = require('fs');
const path = require('path');

const getStaticFiles = async (request, response) => {
    
    const filePath = request.filePath;

    try{
        const extname = String(path.extname(filePath)).toLowerCase();
        const mimeTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.wav': 'audio/wav',
            '.mp4': 'video/mp4',
            '.woff': 'application/font-woff',
            '.ttf': 'application/font-ttf',
            '.eot': 'application/vnd.ms-fontobject',
            '.otf': 'application/font-otf',
            '.wasm': 'application/wasm',
            '.xml' : 'text/xml',
        };
  
        const contentType = mimeTypes[extname] || 'application/octet-stream';
  
        fs.readFile('../Frontend/index.html', function(error, content) {
            if (error) {
                if (error) {
                    response.writeHead(404);
                    response.write('Error: File Not Found');
                } else {
                  //  response.write(data);
                  response.end(data);
                }
            }
            else {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            }
        });
    }catch(err){
        console.log(err);
        //return pug.renderFile('../views/500.pug');
    }
    server.listen(port, function (error) {
        if (error) {
            console.log('Something went wrong ', error);
        } else {
            
            console.log('Server is listening on port ' + port);
        }
    });
}

module.exports = {
    getStaticFiles
} */


var http = require('http');
var fs = require('fs');
var path = require('path');
const port = 5000;

http.createServer(function (request, response) {
    console.log('request ', request.url);

    var filePath = '..' + request.url;
   
    if (filePath == '../') {
        filePath = '../Frontend/index.html';
    }
    console.log("FILEPATH-UL" + filePath);
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
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT') {
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(404, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(port);
console.log('Server is listening on port ' + port);