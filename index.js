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

app.get('/insert/Funcionario', (req, res)=>{
    res.render('insert', {
        tabela: 'Funcionario'
    })
})

app.get('/Ala', (req,res)=>{
    res.render('ala');
})
app.get('/Ala/insert', (req,res)=>{
    res.render('ala_insert');
})

app.get('/Animal', (req,res)=>{
    res.render('animal');
})

app.get('/Animal/insert', (req,res)=>{
    res.render('animal_insert');
})

app.get('/Atende', (req,res)=>{
    res.render('atende');
})

app.get('/Atende/insert', (req,res)=>{
    res.render('atende_insert');
})

app.get('/Bilheteiro', (req,res)=>{
    res.render('bilheteiro');
})

app.get('/Bilheteiro/insert', (req,res)=>{
    res.render('bilheteiro_insert');
})

app.get('/Bilheteria', (req,res)=>{
    res.render('bilheteria');
})

app.get('/Bilheteria/insert', (req,res)=>{
    res.render('bilheteria_insert');
})

app.get('/Cuida', (req,res)=>{
    res.render('cuida');
})

app.get('/Cuida/insert', (req,res)=>{
    res.render('cuida_insert');
})

app.get('/Especie', (req,res)=>{
    res.render('especie');
})

app.get('/Especie/insert', (req,res)=>{
    res.render('especie_insert');
})

app.get('/HorarioAla', (req,res)=>{
    res.render('horarioAla');
})

app.get('/HorarioAla/insert', (req,res)=>{
    res.render('horarioAla_insert');
})

app.get('/HorarioBilheteria', (req,res)=>{
    res.render('horarioBilheteria');
})

app.get('/HorarioBilheteria/insert', (req,res)=>{
    res.render('horarioBilheteria_insert');
})

app.get('/Ingressos', (req,res)=>{
    res.render('ingresso');
})

app.get('/Ingressos/insert', (req,res)=>{
    res.render('ingresso_insert');
})

app.get('/ServicosGerais', (req,res)=>{
    res.render('servicosGerais');
})

app.get('/ServicosGerais/insert', (req,res)=>{
    res.render('servicosGerais_insert');
})

app.get('/Supervisiona', (req,res)=>{
    res.render('supervisiona');
})

app.get('/Supervisiona/insert', (req,res)=>{
    res.render('supervisiona_insert');
})

app.get('/Trabalha', (req,res)=>{
    res.render('trabalho');
})

app.get('/Trabalha/insert', (req,res)=>{
    res.render('trabalho_insert');
})

app.get('/Veterinario', (req,res)=>{
    res.render('veterinario');
})

app.get('/Veterinario/insert', (req,res)=>{
    res.render('veterinario_insert');
})

//FUNÇÕES UPDATE

app.post('/updateAla', (req,res)=>{
    Ala.update({
        cod: req.body.cod,
        localizacao: req.body.localizacao,
        nome: req.body.nome,
        where: {
            idAla: req.body.idAla
        }
    }).then(()=>{
        res.render('/Ala')
    });
});

app.post('/updateAnimal', (req,res)=>{
    Animal.update({
        cod:req.body.cod,
        nome:req.body.nome,
        sexo:req.body.sexo,
        dataNascimento:req.body.dataNascimento,
        codEspecie:req.body.codEspecie,
        ativo:req.body.ativo,
        where: {
            idAnimal: req.body.idAnimal
        }
    }).then(()=>{
        res.render('/Animal')
    });
});

app.post('/updateAtende', (req,res)=>{
    Atende.update({
        cod:req.body.cod,
        CPF:req.body.CPF,
        data:req.body.data,
        diagnostico:req.body.diagnostico,
        codAnimal:req.body.codAnimal,
        where: {
            idAtende: req.body.idAtende
        }
    }).then(()=>{
        res.render('/Atende')
    });
});

app.post('/updateBilheteiro', (req,res)=>{
    Bilheteiro.update({
        CPF:req.body.CPF,
        ddn:req.body.ddn,
        nome:req.body.nome,
        Salario:req.body.Salario,
        CLT:req.body.CLT,
        Endereço:req.body.Endereço,
        Banco:req.body.Banco,
        Agencia:req.body.Agencia,
        Conta:req.body.Conta,
        Digito:req.body.Digito,
        numBilheteria:req.body.numBilheteria,
        ativo:req.body.ativo,
        where: {
            idBilheteiro: req.body.idBilheteiro
        }
    }).then(()=>{
        res.render('/Bilheteiro')
    });
});

app.post('/updateBilheteria', (req,res)=>{
    Bilheteria.update({
        numBilheteria: req.body.numBilheteria,
        localizacao: req.body.localizacao,
        where: {
            idBilheteria: req.body.idBilheteria
        }
    }).then(()=>{
        res.render('/Bilheteria')
    });
});

app.post('/updateCuida', (req,res)=>{
    Cuida.update({
        numBilheteria= req.body.numBilheteria,
        CPF= req.body.CPF,
        where: {
            idCuida: req.body.idCuida
        }
    }).then(()=>{
        res.render('/Bilheteiro')
    });
});

app.post('/updateEspecie', (req,res)=>{
    Especie.update({
        codEspecie: req.body.codEspecie,
        nomeCientifico: req.body.nomeCientifico,
        nomePopular: req.body.nomePopular,
        estado: req.body.estado,
        alimentacao: req.body.alimentacao,
        descricao: req.body.descricao,
        codAla: req.body.codAla,
        where: {
            idEspecie: req.body.idEspecie
        }
    }).then(()=>{
        res.render('/Especie')
    });
});

app.post('/updateHorarioAla', (req,res)=>{
    HorarioAla.update({
        num: req.body.num,
        horario: req.body.horario,
        data: req.body.data,
        numBilheteria: req.body.numBilheteria,
        where: {
            idHorarioAla: req.body.idHorarioAla
        }
    }).then(()=>{
        res.render('/Ala')
    });
});

//FUNÇÕES DE BUSCA

app.get ('/buscaAla', (req,res)=>{
    Ala.FindAll({
        where: {
            $or:[{cod: req.body.cod},{localizacao: req.body.localizacao},{nome:req.body.nome}]
        }
    }).then((alas)=>{
        res.render('/Ala', {alas:alas})
    });
});

app.get ('/buscaAnimal', (req,res)=>{
    Animal.FindAll({
        where: {
            $or:[{cod: req.body.cod},{nome:req.body.nome},{sexo:req.body.sexo},{dataNascimento:req.body.dataNascimento},{codEspecie:req.body.codEspecie}]
        }
    }).then((animal)=>{
        res.render('/Animal', {animal:animal})
    });
});

app.get ('/buscaAtende', (req,res)=>{
    Atende.FindAll({
        where: {
            $or:[{cod: req.body.cod},{CPF:req.body.CPF},{data:req.body.data},{diagnostico:req.body.diagnostico},{codAnimal:req.body.codAnimal}]
        }
    }).then((atende)=>{
        res.render('/Atende', {atende:atende})
    });
});

app.get ('/buscaBilheteiro', (req,res)=>{
    Bilheteiro.FindAll({
        where: {
            $or:[{CPF: req.body.CPF},{nome:req.body.nome},{ddn:req.body.ddn},{Salario:req.body.Salario},{CLT:req.body.CLT},{Endereço:req.body.Endereço},{Banco:req.body.Banco},{Agencia:req.body.Agencia},{Conta:req.body.Conta},{Digito:req.body.Digito}]
        }
    }).then((bilheteiro)=>{
        res.render('/Bilheteiro', {bilheteiro:bilheteiro})
    });
});

app.get ('/buscaBilheteria', (req,res)=>{
    Bilheteria.FindAll({
        where: {
            $or:[{numBilheteria: req.body.numBilheteria},{Localizacao:req.body.Localizacao}]
        }
    }).then((bilheteria)=>{
        res.render('/Bilheteria', {bilheteria:bilheteria})
    });
});

app.get ('/buscaCuida', (req,res)=>{
    Cuida.FindAll({
        where: {
            $or:[{numBilheteria: req.body.numBilheteria},{CPF:req.body.CPF}]
        }
    }).then((cuida)=>{
        res.render('/Bilheteiro', {cuida:cuida})
    });
});

app.get ('/buscaEspecie', (req,res)=>{
    Especie.FindAll({
        where: {
            $or:[{codEspecie: req.body.codEspecie},{nomeCientifico:req.body.nomeCientifico},{nomePopular: req.body.nomePopular},{estado: req.body.estado},{alimentacao: req.body.alimentacao},{descricao: req.body.descricao},{codAla: req.body.codAla}]
        }
    }).then((especie)=>{
        res.render('/Bilheteiro', {especie:especie})
    });
});

app.get ('/buscaHorarioAla', (req,res)=>{
    HorarioAla.FindAll({
        where: {
            $or:[{cod: req.body.cod},{horario:req.body.horario}]
        }
    }).then((horarioala)=>{
        res.render('/Ala', {horarioala:horarioala})
    });
});

app.get ('/buscaHorarioBilheteria', (req,res)=>{
    HorarioBilheteria.FindAll({
        where: {
            $or:[{cod: req.body.cod},{horarioInicio:req.body.horarioInicio},{horarioFinal:req.body.horarioFinal}]
        }
    }).then((horariobilheteria)=>{
        res.render('/Bilheteria', {horariobilheteria:horariobilheteria})
    });
});

app.get ('/buscaIngresso', (req,res)=>{
    Ingresso.FindAll({
        where: {
            $or:[{num: req.body.num},{horario:req.body.horario},{data:req.body.data},{preco:req.body.preco},{numBilheteria:req.body.numBilheteria}]
        }
    }).then((ingresso)=>{
        res.render('/Bilheteria', {ingresso:ingresso})
    });
});

app.get ('/buscaServicosGerais', (req,res)=>{
    ServicosGerais.FindAll({
        where: {
            $or:[{CPF: req.body.CPF},{nome:req.body.nome},{ddn:req.body.ddn},{Salario:req.body.Salario},{CLT:req.body.CLT},{Endereço:req.body.Endereço},{Banco:req.body.Banco},{Agencia:req.body.Agencia},{Conta:req.body.Conta},{Digito:req.body.Digito},{funcao:req.body.funcao}]
        }
    }).then((servicosgerais)=>{
        res.render('/ServicosGerais', {servicosgerais:servicosgerais})
    });
});

app.get ('/buscaHorarioSupervisiona', (req,res)=>{
    Supervisiona.FindAll({
        where: {
            $or:[{CPF: req.body.CPF},{codEspecie:req.body.codEspecie}]
        }
    }).then((supervisiona)=>{
        res.render('/Veterinario', {supervisiona:supervisiona})
    });
});

app.get ('/buscaTrabalha', (req,res)=>{
    Trabalha.FindAll({
        where: {
            $or:[{CPF: req.body.CPF},{horarioInicio:req.body.horarioInicio},{codAla:req.body.codAla},{horarioFim:req.body.horarioFim}]
        }
    }).then((trabalha)=>{
        res.render('/ServicosGerais', {trabalha:trabalha})
    });
});

app.get ('/buscaVeterinario', (req,res)=>{
    Veterinario.FindAll({
        where: {
            $or:[{CPF: req.body.CPF},{nome:req.body.nome},{ddn:req.body.ddn},{Salario:req.body.Salario},{CLT:req.body.CLT},{Endereço:req.body.Endereço},{Banco:req.body.Banco},{Agencia:req.body.Agencia},{Conta:req.body.Conta},{Digito:req.body.Digito},{CRMV:req.body.CRMV},{Faculdade:req.body.Faculdade}]
        }
    }).then((veterinario)=>{
        res.render('/Veterinario', {veterinario:veterinario})
    });
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
    }).then((alas)=>{
        res.redirect('/Ala',{alas:alas})
    });
});

app.get ('/buscatodosAnimal', (req,res)=>{
    Animal.FindAll({
        where: {
            ativo: true
        },
        atributes:['cod','nome','sexo','daraNascimento','codEspecie']
    }).then((animal)=>{
        res.redirect('/Animal',{animal:animal})
    });
});

app.get ('/buscatodosAtende', (req,res)=>{
    Atende.FindAll({
        atributes:['cod','CPF','data','diagnostico','codAnimal']
    }).then((atende)=>{
        res.redirect('/Atende',{atende:atende})
    });
});

app.get ('/buscatodosBilheteiro', (req,res)=>{
    Bilheteiro.FindAll({
        where: {
            ativo: true
        },
        atributes:['CPF','Nome','ddn','Salario','CLT','Endereço','Banco','Agencia','Conta','Digito']
    }).then((bilheteiro)=>{
        res.redirect('/Bilheteiro', {bilheteiro:bilheteiro})
    });
});

app.get ('/buscatodosBilheteria', (req,res)=>{
    Bilheteria.FindAll({
        atributes:['numBilheteria','localizacao']
    }).then((bilheteria)=>{
        res.redirect('/Bilheteria',{bilheteria:bilheteria})
    });
});

app.get ('/buscatodosCuida', (req,res)=>{
    Cuida.FindAll({
        atributes:['CPF','numBilheteria']
    }).then((cuida)=>{
        res.redirect('/Bilheteiro',{cuida:cuida})
    });
});

app.get ('/buscatodosEspecie', (req,res)=>{
    Especie.FindAll({
        atributes:['codEspecie','nomeCientifico','nomePopular','estado','alimentacao','descricao','codAla']
    }).then((especie)=>{
        res.redirect('/Especie',{especie:especie})
    });
});

app.get ('/buscatodosHorarioAla', (req,res)=>{
    HorarioAla.FindAll({
        atributes:['cod','horario']
    }).then((horarioala)=>{
        res.redirect('/Ala',{horarioala:horarioala})
    });
});

app.get ('/buscatodosHorarioBilheteria', (req,res)=>{
    HorarioBilheteria.FindAll({
        atributes:['cod','horarioInicio','horarioFinal']
    }).then((horariobilheteria)=>{
        res.redirect('/Bilheteria',{horariobilheteria:horariobilheteria})
    });
});

app.get ('/buscatodosIngresso', (req,res)=>{
    Ingresso.FindAll({
        atributes:['num','horario','data','numBilheteria']
    }).then((ingresso)=>{
        res.redirect('/Ala',{ingresso:ingresso})
    });
});

app.get ('/buscatodosServicosGerais', (req,res)=>{
    ServicosGerais.FindAll({
        where: {
            ativo: true
        },
        atributes:['CPF','Nome','ddn','Salario','CLT','Endereço','Banco','Agencia','Conta','Digito','funcao']
    }).then((servicosgerais)=>{
        res.redirect('/ServicosGerais',{servicosgerais:servicosgerais})
    });
});

app.get ('/buscatodosSupervisiona', (req,res)=>{
    Supervisiona.FindAll({
        atributes:['CPF','codEspecie']
    }).then((supervisiona)=>{
        res.redirect('/Veterinario',{supervisiona:supervisiona})
    });
});

app.get ('/buscatodosTrabalha', (req,res)=>{
    Trabalha.FindAll({
        atributes:['CPF','codAla','horarioInicio','horarioFim']
    }).then((trabalha)=>{
        res.redirect('/ServicosGerais',{trabalha:trabalha})
    });
});

app.get ('/buscatodosVeterinario', (req,res)=>{
    Veterinario.FindAll({
        where: {
            ativo: true
        },
        atributes:['CPF','Nome','ddn','Salario','CLT','Endereço','Banco','Agencia','Conta','Digito','CRMV','Faculdade']
    }).then((veterinario)=>{
        res.redirect('/Veterinario',{veterinario:veterinario})
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