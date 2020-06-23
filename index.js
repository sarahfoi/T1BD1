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


// TELAS DE INSERÇÃO
app.get('/insert/Ala', (req, res)=>{
    res.render('insert', {
        tabela: 'Ala'
    })
});

app.get('/insert/Animal', (req, res)=>{
    res.render('insert', {
        tabela: 'Animal'
    })
});

app.get('/insert/Atende', (req, res)=>{
    res.render('insert', {
        tabela: 'Atende'
    })
});

app.get('/insert/Bilheteria', (req, res)=>{
    res.render('insert', {
        tabela: 'Bilheteria'
    })
});

app.get('/insert/Especie', (req, res)=>{
    res.render('insert', {
        tabela: 'Especie'
    })
});

app.get('/insert/ServicosGerais', (req, res)=>{
    res.render('insert', {
        tabela: 'ServicosGerais'
    })
});

app.get('/insert/Veterinario', (req, res)=>{
    res.render('insert', {
        tabela: 'Veterinario'
    })
});

app.get('/insert/Bilheteiro', (req, res)=>{
    res.render('insert', {
        tabela: 'Bilheteiro'
    })
});

app.get('/insert/Ingresso', (req, res)=>{
    res.render('insert', {
        tabela: 'Ingresso'
    })
});


// TELAS DE CONSULTA TODOS (select)
app.get('/select/Ala', (req, res)=>{
    res.render('select', {
        tabela: 'Ala'
    })
});

app.get('/select/Animal', (req, res)=>{
    res.render('select', {
        tabela: 'Animal'
    })
});

app.get('/select/Atende', (req, res)=>{
    res.render('select', {
        tabela: 'Atende'
    })
});

app.get('/select/Bilheteria', (req, res)=>{
    res.render('select', {
        tabela: 'Bilheteria'
    })
});

app.get('/select/Especie', (req, res)=>{
    res.render('select', {
        tabela: 'Especie'
    })
});

app.get('/select/ServicosGerais', (req, res)=>{
    res.render('select', {
        tabela: 'ServicosGerais'
    })
});

app.get('/select/Veterinario', (req, res)=>{
    res.render('select', {
        tabela: 'Veterinario'
    })
});

app.get('/select/Bilheteiro', (req, res)=>{
    res.render('select', {
        tabela: 'Bilheteiro'
    })
});

app.get('/select/Ingresso', (req, res)=>{
    res.render('select', {
        tabela: 'Ingresso'
    })
});

//FUNÇÕES DE REMOÇÃO

app.post('/removeAla',(req,res)=>{
    Ala.destroy({
        where: {
            cod: req.body.cod
        }
    }).then(()=>{
        res.render('/Ala')
    });
});

app.post('/removeAtende',(req,res)=>{
    Atende.destroy({
        where: {
            cod: req.body.cod
        }
    }).then(()=>{
        res.render('/Atende')
    });
});

app.post('/removeBilheteria',(req,res)=>{
    Bilheteria.destroy({
        where: {
            numBilheteria: req.body.numBilheteria
        }
    }).then(()=>{
        res.render('/Bilheteria')
    });
});

app.post('/removeCuida',(req,res)=>{
    Cuida.destroy({
        where: {
            CPF: req.body.CPF,
            numBilheteria: req.body.numBilheteria
        }
    }).then(()=>{
        res.render('/Cuida')
    });
});

app.post('/removeEspecie',(req,res)=>{
    Especie.destroy({
        where: {
            codEspecie: req.body.codEspecie
        }
    }).then(()=>{
        res.render('/Especie')
    });
});

app.post('/removehorarioAla',(req,res)=>{
    HorarioAla.destroy({
        where: {
            cod: req.body.cod,
            horario: req.body.horario
        }
    }).then(()=>{
        res.render('/Ala')
    });
});

app.post('/removehorarioBilheteria',(req,res)=>{
    HorarioBilheteria.destroy({
        where: {
            cod: req.body.cod,
            horarioInicio:req.body.horarioInicio,
            horarioFinal: req.body.horarioFinal
        }
    }).then(()=>{
        res.render('/Bilheteria')
    });
});

app.post('/removeIngresso',(req,res)=>{
    Ingresso.destroy({
        where: {
            num: req.body.num
        }
    }).then(()=>{
        res.render('/Ingresso')
    });
});

app.post('/removeSupervisiona',(req,res)=>{
    Supervisiona.destroy({
        where: {
            CPF: req.body.CPF,
            codEspecie: req.body.codEspecie
        }
    }).then(()=>{
        res.render('/Veterinario')
    });
});

app.post('/removeTrabalha',(req,res)=>{
    Trabalha.destroy({
        where: {
            CPF: req.body.CPF,
            codAla: req.body.codAla,
            horarioInicio: req.body.horarioInicio,
            horarioFim: req.body.horarioFim
        }
    }).then(()=>{
        res.render('/ServicosGerais')
    });
});

app.post('/removeAnimal', (req,res)=>{
    Animal.update({
        ativo: false,
        where: {
            cod: req.body.cod
        }
    }).then(()=>{
        res.render('/animal')
    });
});

app.post('/removeBilheteiro', (req,res)=>{
    Bilheteiro.update({
        ativo: false,
        where: {
            CPF: req.body.CPF
        }
    }).then(()=>{
        res.render('/Bilheteiro')
    });
});

app.post('/removeServicosGerais', (req,res)=>{
    ServicosGerais.update({
        ativo: false,
        where: {
            CPF: req.body.CPF
        }
    }).then(()=>{
        res.render('/ServicosGerais')
    });
});

app.post('/removeVeterinario', (req,res)=>{
    Veterinario.update({
        ativo: false,
        where: {
            CPF: req.body.CPF
        }
    }).then(()=>{
        res.render('/Veterinario')
    });
});

//FUNÇÕES DE BUSCA TODOS

app.get ('/buscatodosAla', (req,res)=>{
    Ala.FindAll({
        atributes:['cod','localizacao','nome']
    }).then(()=>{
        res.redirect('/Ala')
    });
});

app.get ('/buscatodosAnimal', (req,res)=>{
    Animal.FindAll({
        where: {
            ativo: true
        },
        atributes:['cod','nome','sexo','daraNascimento','codEspecie']
    }).then(()=>{
        res.redirect('/Animal')
    });
});

app.get ('/buscatodosAtende', (req,res)=>{
    Atende.FindAll({
        atributes:['cod','CPF','data','diagnostico','codAnimal']
    }).then(()=>{
        res.redirect('/Atende')
    });
});

app.get ('/buscatodosBilheteiro', (req,res)=>{
    Bilheteiro.FindAll({
        where: {
            ativo: true
        },
        atributes:['CPF','Nome','ddn','Salario','CLT','Endereço','Banco','Agencia','Conta','Digito']
    }).then(()=>{
        res.redirect('/Bilheteiro')
    });
});

app.get ('/buscatodosBilheteria', (req,res)=>{
    Bilheteria.FindAll({
        atributes:['numBilheteria','localizacao']
    }).then(()=>{
        res.redirect('/Bilheteria')
    });
});

app.get ('/buscatodosCuida', (req,res)=>{
    Cuida.FindAll({
        atributes:['CPF','numBilheteria']
    }).then(()=>{
        res.redirect('/Bilheteiro')
    });
});

app.get ('/buscatodosEspecie', (req,res)=>{
    Especie.FindAll({
        atributes:['codEspecie','nomeCientifico','nomePopular','estado','alimentacao','descricao','codAla']
    }).then(()=>{
        res.redirect('/Especie')
    });
});

app.get ('/buscatodosHorarioAla', (req,res)=>{
    HorarioAla.FindAll({
        atributes:['cod','horario']
    }).then(()=>{
        res.redirect('/Ala')
    });
});

app.get ('/buscatodosHorarioBilheteria', (req,res)=>{
    HorarioBilheteria.FindAll({
        atributes:['cod','horarioInicio','horarioFinal']
    }).then(()=>{
        res.redirect('/Bilheteria')
    });
});

app.get ('/buscatodosIngresso', (req,res)=>{
    Ingresso.FindAll({
        atributes:['num','horario','data','numBilheteria']
    }).then(()=>{
        res.redirect('/Ala')
    });
});

app.get ('/buscatodosServicosGerais', (req,res)=>{
    ServicosGerais.FindAll({
        where: {
            ativo: true
        },
        atributes:['CPF','Nome','ddn','Salario','CLT','Endereço','Banco','Agencia','Conta','Digito','funcao']
    }).then(()=>{
        res.redirect('/ServicosGerais')
    });
});

app.get ('/buscatodosSupervisiona', (req,res)=>{
    Supervisiona.FindAll({
        atributes:['CPF','codEspecie']
    }).then(()=>{
        res.redirect('/Veterinario')
    });
});

app.get ('/buscatodosTrabalha', (req,res)=>{
    Trabalha.FindAll({
        atributes:['CPF','codAla','horarioInicio','horarioFim']
    }).then(()=>{
        res.redirect('/ServicosGerais')
    });
});

app.get ('/buscatodosVeterinario', (req,res)=>{
    Veterinario.FindAll({
        where: {
            ativo: true
        },
        atributes:['CPF','Nome','ddn','Salario','CLT','Endereço','Banco','Agencia','Conta','Digito','CRMV','Faculdade']
    }).then(()=>{
        res.redirect('/Veterinario')
    });
});

//FUNÇÕES DE INSERÇÃO

app.post ("/insereAla", (req,res) =>{
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

app.post ("/insereAnimal", (req,res) =>{
    var cod= req.body.cod;
    var nome=req.body.nome;
    var sexo=req.body.sexo;
    var dataNascimento=req.body.dataNascimento;
    var codEspecie=req.body.codEspecie;
    var ativo=true;
    Animal.create({
        cod:cod,
        nome:nome,
        sexo:sexo,
        dataNascimento:dataNascimento,
        especieId:codEspecie,
        ativo:ativo
    }).then(()=>{
    res.redirect("/")
    });
});

app.post ("/insereBilheteiro", (req,res) =>{
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

app.post ("/insereAtende", (req,res) =>{
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

app.post ("/insereBilheteria", (req,res) =>{
    var numBilheteria= req.body.numBilheteria;
    var localizacao= req.body.localizacao;
    Bilheteria.create({
        numBilheteria:numBilheteria,
        localizacao:localizacao
    }).then(()=>{
    res.redirect("/")
    });
});

app.post ("/insereCuida", (req,res) =>{
    var numBilheteria= req.body.numBilheteria;
    var CPF= req.body.CPF;
    Cuida.create({
        numBilheteria:numBilheteria,
        CPF:CPF
    }).then(()=>{
    res.redirect("/")
    });
});

app.post ("/insereHorarioBilheteria", (req,res) =>{
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

app.post ("/insereBilheteria", (req,res) =>{
    var numBilheteria= req.body.numBilheteria;
    var localizacao= req.body.localizacao;
    Bilheteria.create({
        numBilheteria:numBilheteria,
        localizacao:localizacao,
    }).then(()=>{
    res.redirect("/")
    });
});

app.post ("/insereEspecie", (req,res) =>{
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

app.post ("/insereHorarioAla", (req,res) =>{
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

app.post ("/insereServicosGerais", (req,res) =>{
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

app.post ("/insereSupervisiona", (req,res) =>{
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

app.post ("/insereVeterinario", (req,res) =>{
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