let express = require("express");
let session = require("cookie-session");
let bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({ extended: false });
let app = express();
// on utilise les sessions
app.use(session({ secret: "todotopsecret" }))
  //si il n y'a pas de todolist dans la session on en crée une
  .use((req, res, next) => {
    if (typeof(req.session.todolist) == 'undefined') {
      req.session.todolist = [];
    }
    next();
  })
  // on affiche la todolist et le formulaire
  .get("/", (req, res) => {
    res.render("home.ejs", { todolist: req.session.todolist });
  })
  // on verifie si l'input est different de vide si il est on push l'action dans le tableau de session todolist
  .post("/ajouter",urlencodedParser, (req,res,next) => {
    if (req.body.action != "") {
      req.session.todolist.push(req.body.action);
    }
    res.redirect("/");
  })
  .get("/supprimer/:id", (req, res) => {
    if (req.params.id != "") {
    req.session.todolist.splice(req.params.id,1);
 }
 res.redirect('/');
  })
.use((req,res,next)=>{
    res.redirect('/')
})
.listen(8080)