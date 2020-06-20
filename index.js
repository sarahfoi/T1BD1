const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/*-------------ROTAS-------------*/

//HOME
app.get('/', (req, res)=>{
    res.render("index"); 
});

app.get('/login', (req, res)=>{
    res.render('login');
});

/*-----------FIM ROTAS-----------*/
app.listen(8000, ()=>{
    console.log("Site rodando");
});