let http = require('http');
let markdown = require('markdown').markdown;
let Hello = require('./teste')
let server = http.createServer((req,res) => {
res.writeHead(200,{'Content-type' : 'text/html'});
res.end(markdown.toHTML(Hello.Hello()));
});

server.listen(8080);