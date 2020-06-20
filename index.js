const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Ala = require("./database/Ala");
const Animal = require("./database/Animal");
const Atende = require("./database/Atende");
const Bilheteiro = require("./database/Bilheteiro");
const Bilheteria = require("./database/Bilheteria");
const Cuida= require ("./database/Cuida");
const Especie= require("./database/Especie");
const HorarioAla= require("./database/HorarioAla");
const HorarioBilheteria= require("./database/HorarioBilheteria");
const Ingresso= require("./database/Ingresso");
const ServicosGerais = require("./database/ServicosGerais");
const Supervisiona= require("./database/Supervisiona");
const Trabalha= require("./database/Trabalha");
const Veterinario= require("./database/Veterinario");

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

app.get('/Ala', (req,res)=>{
    res.render('ala');
})

app.get('/Animal', (req,res)=>{
    res.render('animal');
})



//FUNÇÕES DE INSERÇÃO

app.post ("/insereala", (req,res) =>{
    var cod= req.body.cod;
    var localizacao= req.body.localizacao;
    var nome=req.body.nome;
    Ala.create({
        cod:cod,
        localizacao:localizacao,
        nome:nome
    }).then(()=>{
    res.redirect("/")
    });
});

app.post ("/insereanimal", (req,res) =>{
    var cod= req.body.cod;
    var nome=req.body.nome;
    var sexo=req.body.sexo;
    var dataNascimento=req.body.dataNascimento;
    var codEspecie=req.body.codEspecie;
    var ativo=req.body.ativo;
    Animal.create({
        cod:cod,
        nome:nome,
        sexo:sexo,
        dataNascimento:dataNascimento,
        codEspecie:codEspecie,
        ativo:ativo
    }).then(()=>{
    res.redirect("/")
    });
});

app.post ("/inserebilheteiro", (req,res) =>{
    var CPF= req.body.CPF;
    var ddn= req.body.ddn;
    var nome=req.body.nome;
    var Salario=req.body.Salario;
    var CLT=req.body.CLT;
    var Endereço=req.body.Endereço;
    var Banco=req.body.Banco;
    var Agencia=req.body.Agencia;
    var Conta=req.body.Conta;
    var Digito=req.body.Digito;
    var numBilheteria=req.body.numBilheteria;
    var ativo=req.body.ativo;
    Bilheteiro.create({
        CPF:CPF,
        ddn:ddn,
        nome:nome,
        Salario:Salario,
        CLT:CLT,
        Endereço:Endereço,
        Banco:Banco,
        Agencia:Agencia,
        Conta:Conta,
        Digito:Digito,
        numBilheteria:numBilheteria,
        ativo:ativo
    }).then(()=>{
    res.redirect("/")
    });
});

app.post ("/insereatende", (req,res) =>{
    var cod= req.body.cod;
    var CPF= req.body.CPF;
    var data=req.body.data;
    var diagnostico=req.body.diagnostico;
    var codAnimal=req.body.codAnimal;
    Atende.create({
        cod:cod,
        CPF:CPF,
        data:data,
        diagnostico:diagnostico,
        codAnimal:codAnimal
    }).then(()=>{
    res.redirect("/")
    });
});

app.post ("/inserebilheteria", (req,res) =>{
    var numBilheteria= req.body.numBilheteria;
    var localizacao= req.body.localizacao;
    Bilheteria.create({
        numBilheteria:numBilheteria,
        localizacao:localizacao
    }).then(()=>{
    res.redirect("/")
    });
});

app.post ("/inserecuida", (req,res) =>{
    var numBilheteria= req.body.numBilheteria;
    var CPF= req.body.CPF;
    Cuida.create({
        numBilheteria:numBilheteria,
        CPF:CPF
    }).then(()=>{
    res.redirect("/")
    });
});

app.post ("/inserehorariobilheteria", (req,res) =>{
    var cod= req.body.cod;
    var horarioInicio= req.body.horarioInicio;
    var horarioFinal= req.body.horarioFinal
    HorarioBilheteria.create({
        cod:cod,
        horarioFinal:horarioFinal,
        horarioInicio:horarioInicio
    }).then(()=>{
    res.redirect("/")
    });
});

app.post ("/inserebilheteria", (req,res) =>{
    var numBilheteria= req.body.numBilheteria;
    var localizacao= req.body.localizacao;
    Bilheteria.create({
        numBilheteria:numBilheteria,
        localizacao:localizacao,
    }).then(()=>{
    res.redirect("/")
    });
});

app.post ("/insereespecie", (req,res) =>{
    var codEspecie= req.body.codEspecie;
    var nomeCientifico= req.body.nomeCientifico;
    var nomePopular= req.body.nomePopular;
    var estado= req.body.estado;
    var alimentacao= req.body.alimentacao;
    var descricao= req.body.descricao;
    var codAla= req.body.codAla;
    Especie.create({
        codEspecie:codEspecie,
        nomeCientifico:nomeCientifico,
        nomePopular:nomePopular,
        estado:estado,
        alimentacao:alimentacao,
        descricao:descricao,
        codAla:codAla
    }).then(()=>{
    res.redirect("/")
    });
});

app.post ("/inserehorarioala", (req,res) =>{
    var num= req.body.num;
    var horario= req.body.horario;
    var data=req.body.data;
    var numBilheteria=req.body.numBilheteria;
    Ingresso.create({
        num:num,
        horario:horario,
        data:data,
        numBilheteria:numBilheteria
    }).then(()=>{
    res.redirect("/")
    });
});

app.post ("/insereservicosgerais", (req,res) =>{
    var CPF= req.body.CPF;
    var ddn= req.body.ddn;
    var nome=req.body.nome;
    var Salario=req.body.Salario;
    var CLT=req.body.CLT;
    var Endereço=req.body.Endereço;
    var Banco=req.body.Banco;
    var Agencia=req.body.Agencia;
    var Conta=req.body.Conta;
    var Digito=req.body.Digito;
    var funcao=req.body.funcao;
    var ativo=req.body.ativo;
    ServicosGerais.create({
        CPF:CPF,
        ddn:ddn,
        nome:nome,
        Salario:Salario,
        CLT:CLT,
        Endereço:Endereço,
        Banco:Banco,
        Agencia:Agencia,
        Conta:Conta,
        Digito:Digito,
        funcao:funcao,
        ativo:ativo
    }).then(()=>{
    res.redirect("/")
    });
});

app.post ("/inseresupervisiona", (req,res) =>{
    var CPF= req.body.CPF;
    var codEspecie= req.body.codEspecie;
    Supervisiona.create({
        CPF:CPF,
        codEspecie:codEspecie
    }).then(()=>{
    res.redirect("/")
    });
});

app.post ("/insereTrabalha", (req,res) =>{
    var CPF= req.body.CPF;
    var horarioInicio= req.body.horarioInicio;
    var horariofim=req.body.horariofim;
    var codAla=req.body.codAla;
    Trabalha.create({
        CPF:CPF,
        horarioInicio:horarioInicio,
        horariofim:horariofim,
        codAla:codAla
    }).then(()=>{
    res.redirect("/")
    });
});

app.post ("/insereveterinario", (req,res) =>{
    var CPF= req.body.CPF;
    var ddn= req.body.ddn;
    var nome=req.body.nome;
    var Salario=req.body.Salario;
    var CLT=req.body.CLT;
    var Endereço=req.body.Endereço;
    var Banco=req.body.Banco;
    var Agencia=req.body.Agencia;
    var Conta=req.body.Conta;
    var Digito=req.body.Digito;
    var CRMV=req.body.CRMV;
    var Faculdade=req.body.Faculdade
    var ativo=req.body.ativo;
    Veterinario.create({
        CPF:CPF,
        ddn:ddn,
        nome:nome,
        Salario:Salario,
        CLT:CLT,
        Endereço:Endereço,
        Banco:Banco,
        Agencia:Agencia,
        Conta:Conta,
        Digito:Digito,
        CRMV:CRMV,
        Faculdade:Faculdade,
        ativo:ativo
    }).then(()=>{
    res.redirect("/")
    });
});

/*-----------FIM ROTAS-----------*/
app.listen(8000, ()=>{
    console.log("Site rodando");
});