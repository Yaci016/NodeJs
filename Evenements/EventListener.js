let http = require('http');

//Teste d'une emission / reception evenment
let EventEmitter = require('events').EventEmitter;
let jeu = new EventEmitter;

jeu.on('gameOver',(message)=>  console.log(message));

jeu.emit('gameOver','You lost. Try again.');

let server = http.createServer((req,res) => {
res.writeHead(200,{'Content-type' : 'text/html'});
res.end('Hello word !')
});
server.on('close',()=> console.log('I am listen to this  close event !'));
server.listen(8080);
server.close();