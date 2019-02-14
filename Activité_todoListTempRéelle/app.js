var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    he = require('he'), // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
    bodyParser = require('body-parser'), // Charge le middleware de gestion des paramètres
    urlencodedParser = bodyParser.urlencoded({ extended: false });
    



/* S'il n'y a pas de todolist dans la session,
on en crée une vide sous forme d'array avant la suite */
let object = {};
if (typeof(object.todolist) === 'undefined') {
    object.todolist = [];
}
/* On affiche la todolist et le formulaire */
app.get('/todo', function(req, res) { 
    res.render('todo.ejs', {todolist: object.todolist});
})

/* On ajoute un élément à la todolist */
.post('/todo/ajouter/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        object.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})

/* Supprime un élément de la todolist */
.get('/todo/supprimer/:id', function(req, res) {
    if (req.params.id != '') {
        object.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})

/* On redirige vers la todolist si la page demandée n'est pas trouvée */
.use(function(req, res, next){
    res.redirect('/todo');
});

server.listen(8080);   