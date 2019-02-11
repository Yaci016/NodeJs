let http = require('http');

let server = http.createServer((req, res) => {
    res.writeHead(200,{"Content-Type":"text/html"});
    res.end('<h1>Hello World ! </h1>');
});
server.listen(8080);