let http = require('http');
let url = require('url');
let queryString = require('querystring');

let server = http.createServer((req, res) => {
    let page = url.parse(req.url).pathname;
    let params = queryString.parse(url.parse(req.url).query);
    
    switch (page) {
        case '/': case '/home':
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write("<h1>Hello World ! </h1>");
        break;
        case '/nom':
        res.writeHead(200,{"Content-Type":"text/html"});
        if ('name' in params && params['name'] != '') {
            res.write("<h1>Hello "+ params['name']+" ! </h1>");
        } else {
            res.write("<h1>Hello annonymous ! </h1>");
        }
        break;
        default : 
        res.writeHead(404,{"Content-Type":"text/html"});
        res.write('404 error. Cette page n\'existe pas : '+page);
        break;
    }
    res.end('');
});
server.listen(8080);