var app = require("express")(),
  server = require("http").createServer(app),
  io = require("socket.io").listen(server),
  he = require("he"), // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP) j'utilise le mode he au lieu du module proposer dans le cours.
  bodyParser = require("body-parser"), // Charge le middleware de gestion des paramètres
  urlencodedParser = bodyParser.urlencoded({ extended: false });

/* S'il n'y a pas de todolist dans la session,
on en crée une vide sous forme d'array avant la suite */
let object = {};
if (typeof object.todolist === "undefined") {
  object.todolist = [];
}
/* On affiche la todolist et le formulaire */
app
  .get("/todo", function(req, res) {
    res.render("todo.ejs", { todolist: object.todolist });
  })

  /* On redirige vers la todolist si la page demandée n'est pas trouvée */
  .use(function(req, res, next) {
    res.redirect("/todo");
  });

  io.sockets.on('connection', socket => {
        //Event qu'on on rajoute un element
    socket.on('todo',todo=> {
        if (todo != "") {
            object.todolist.push(he.encode(todo));
          }
        socket.emit("actualisationTodoAFaire", { todolist: object.todolist });
        socket.broadcast.emit("actualisationTodoAFaire", { todolist: object.todolist });
      });
        //Event qu'on on supprime un element
    socket.on('delete',index=> {
        if (index != "") {
            object.todolist.splice(index, 1);
          }
        socket.emit("actualisationTodoAFaire", { todolist: object.todolist });
        socket.broadcast.emit("actualisationTodoAFaire", { todolist: object.todolist });
      });

  })
server.listen(8080);
