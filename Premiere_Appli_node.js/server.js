let http = require('http');
let url = require('url');
let queryString = require('querystring');

let server = http.createServer((req, res) => {
    let page = url.parse(req.url).pathname;
    let params = queryString.parse(url.parse(req.url).query);
    console.log('name' in params);
    res.writeHead(200,{"Content-Type":"text/html"});
    switch (page) {
        case '/': case '/home':
        res.write("<h1>Hello World ! </h1>");
        break;
        case 'nom':
        if ('name' in params) {
            res.write("<h1>Hello "+ params['name']+" ! </h1>");
        } else {
            res.write("<h1>Hello annonymous ! </h1>");
        }
        break;
        default : 
        res.write('404 error. Cette page n\'existe pas : '+page);
        break;
    }
    res.end('');
});
server.listen(8080);