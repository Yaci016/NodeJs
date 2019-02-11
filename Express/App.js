let express = require('express');
let app = express();

app.get('/',(req,res)=> {
    res.setHeader('Content-type','text/plain');
    res.send('Vous êtes a l\'accueil');
})
.get('/compte/:ids',(req,res) => { res.render('identifiants.ejs',{identifiant:req.params.ids})})
.get('/number/:num',(req,res)=> { 
    let noms = ['yacine','yasmine','yanice'];
    res.render('number.ejs',{numero: req.params.num,tableau:noms})
})
.use((req,res,next) => {
    res.setHeader('Content-type','text/plain');
    res.status(404).send('404 Error page not found');
})
app.listen(8080)