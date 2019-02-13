"use strict";
let http = require("http");
let fs = require("fs");
let server = http.createServer((req, res) => {
  fs.readFile("./index.html", "utf-8", (error, content) => {
    res.writeHead(200), { "Content-type": "text/html" };
    res.end(content);
  });
});

//chargement de socket io
let io = require("socket.io").listen(server);

io.sockets.on("connection", socket => {
  //Dès qu'on nous donne un pseudo , on le stocke en methode de l'objet socket
  socket.on("pseudo", pseudo => {
    socket.pseudo = pseudo;
        //On signale aux autres clients qu'il y a un nouveau venu
        socket.broadcast.emit(
            "premiereConnexion",
            "<p><strong>" + pseudo + "</strong> viens de se connecter</p>"
          );
  });
  // Dès qu'on recoit un message , on l'envoie a soi meme et a tout les autre
  socket.on("message", message => {
    socket.broadcast.emit(
      "messageChat",
      "<strong>" + socket.pseudo + " :</strong> " + message
    );
    socket.emit(
      "messageChat",
      "<strong>" + socket.pseudo + " :</strong> " + message
    );
  });
});
server.listen(8080);
