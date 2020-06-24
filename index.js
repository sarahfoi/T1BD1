const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Ala = require("./database/Ala");
const Animal = require("./database/Animal");
const Atende = require("./database/Atende");
const Bilheteiro = require("./database/Bilheteiro");
const Bilheteria = require("./database/Bilheteria");
const Cuida = require("./database/Cuida");
const Especie = require("./database/Especie");
const HorarioAla = require("./database/HorarioAla");
const HorarioBilheteria = require("./database/HorarioBilheteria");
const Ingresso = require("./database/Ingresso");
const ServicosGerais = require("./database/ServicosGerais");
const Supervisiona = require("./database/Supervisiona");
const Trabalha = require("./database/Trabalha");
const Veterinario = require("./database/Veterinario");

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*-------------ROTAS-------------*/

//HOME
app.get('/', (req, res) => {
    res.render("index");
});

app.get('/login', (req, res) => {
    res.render('login');
});


// TELAS DE INSERÇÃO
app.get('/insert/Ala', (req, res) => {
    res.render('insert', {
        tabela: 'Ala'
    })
});

app.get('/insert/Animal', (req, res) => {
    res.render('insert', {
        tabela: 'Animal'
    })
});

app.get('/insert/Atende', (req, res) => {
    res.render('insert', {
        tabela: 'Atende'
    })
});

app.get('/insert/Bilheteria', (req, res) => {
    res.render('insert', {
        tabela: 'Bilheteria'
    })
});

app.get('/insert/Especie', (req, res) => {
    res.render('insert', {
        tabela: 'Especie'
    })
});

app.get('/insert/ServicosGerais', (req, res) => {
    res.render('insert', {
        tabela: 'ServicosGerais'
    })
});

app.get('/insert/Veterinario', (req, res) => {
    res.render('insert', {
        tabela: 'Veterinario'
    })
});

app.get('/insert/Bilheteiro', (req, res) => {
    res.render('insert', {
        tabela: 'Bilheteiro'
    })
});

app.get('/insert/Ingresso', (req, res) => {
    res.render('insert', {
        tabela: 'Ingresso'
    })
});


// TELAS DE CONSULTA TODOS (select)

app.get('/select/Home', (req, res) => {
    res.render('select', {
        tabela: 'Home'
    })
});

app.get('/select/Ala', (req, res) => {
    Ala.findAll({
        atributes: ['localizacao', 'nome']
    }).then((resultado) => {
        res.render('select', {
            tabela: 'Ala',
            resultado: resultado
        })
    })
});

app.get('/select/Animal', (req, res) => {
    Animal.findAll({
        where: {
            ativo: true
        },
        atributes: ['nome', 'sexo', 'dataNascimento', 'especieId']
    }).then((resultado) => {
        res.render('select', {
            tabela: 'Animal',
            resultado: resultado
        })
    })
});

app.get('/select/Atende', (req, res) => {
    Atende.findAll({
        atributes: ['animalId', 'veterinarioCPF', 'data', 'diagnostico']
    }).then((resultado) => {
        res.render('select', {
            tabela: 'Atende',
            resultado: resultado
        })
    })
});

app.get('/select/Bilheteiro', (req, res) => {
    Bilheteiro.findAll({
        where: {
            ativo: true
        },
        atributes: ['CPF', 'Nome', 'ddn', 'Salario', 'CLT', 'Endereço', 'Banco', 'Agencia', 'Conta', 'Digito','bilheteriaId']
    }).then((resultado) => {
        res.render('select', {
            tabela: 'Bilheteiro',
            resultado: resultado
        })
    })
});

app.get('/select/Bilheteria', (req, res) => {
    Bilheteria.findAll({
        atributes: ['bilheteriaId', 'localizacao']
    }).then((resultado) => {
        res.render('select', {
            tabela: 'Bilheteria',
            resultado: resultado
        })
    })
});

app.get('/select/Especie', (req, res) => {
    Especie.findAll({
        atributes: ['especieId', 'nomeCientifico', 'nomePopular', 'estado', 'alimentacao', 'descricao', 'alaId']
    }).then((resultado) => {
        res.render('select', {
            tabela: 'Especie',
            resultado: resultado
        })
    })
});

app.get('/select/Funcionario', (req, res) => {
    res.render('select', {
        tabela: 'Funcionario'
    });
});

app.get('/select/ServicosGerais', (req, res) => {
    ServicosGerais.findAll({
        where: {
            ativo: true
        },
        atributes: ['CPF', 'Nome', 'ddn', 'Salario', 'CLT', 'Endereço', 'Banco', 'Agencia', 'Conta', 'Digito', 'funcao']
    }).then((resultado) => {
        res.render('select', {
            tabela: 'ServicosGerais',
            resultado: resultado
        })
    })
});

app.get('/select/Veterinario', (req, res) => {
    Veterinario.findAll({
        where: {
            ativo: true
        },
        atributes: ['CPF', 'Nome', 'ddn', 'Salario', 'CLT', 'Endereço', 'Banco', 'Agencia', 'Conta', 'Digito', 'CRMV', 'Faculdade']
    }).then((resultado) => {
        res.render('select', {
            tabela: 'Veterinario',
            resultado: resultado,
        })
    })
});

app.get('/select/Ingresso', (req, res) => {
    Ingresso.findAll({
        atributes: ['ingressoId', 'horario', 'data', 'bilheteriaId']
    }).then((resultado) => {
        res.render('select', {
            tabela: 'Ingresso',
            resultado: resultado
        })
    })
});

//FUNÇÕES DE REMOÇÃO

app.post('/removeAla', (req, res) => {
    Ala.destroy({
        where: {
            alaId: req.body.alaId
        }
    }).then(() => {
        res.render('/Ala')
    });
});

app.post('/removeAtende', (req, res) => {
    Atende.destroy({
        where: {
            atendeId: req.body.atendeId
        }
    }).then(() => {
        res.render('/Atende')
    });
});

app.post('/removeBilheteria', (req, res) => {
    Bilheteria.destroy({
        where: {
            bilheteriaId: req.body.bilheteriaId
        }
    }).then(() => {
        res.render('/Bilheteria')
    });
});

app.post('/removeCuida', (req, res) => {
    Cuida.destroy({
        where: {
            CPF: req.body.CPF,
            bilheteriaId: req.body.bilheteriaId
        }
    }).then(() => {
        res.render('/Cuida')
    });
});

app.post('/removeEspecie', (req, res) => {
    Especie.destroy({
        where: {
            especieId: req.body.especieId
        }
    }).then(() => {
        res.render('/Especie')
    });
});

app.post('/removehorarioAla', (req, res) => {
    HorarioAla.destroy({
        where: {
            alaId: req.body.alaId,
            horario: req.body.horario
        }
    }).then(() => {
        res.render('/Ala')
    });
});

app.post('/removehorarioBilheteria', (req, res) => {
    HorarioBilheteria.destroy({
        where: {
            bilheteriaId: req.body.bilheteriaId,
            horarioInicio: req.body.horarioInicio,
            horarioFinal: req.body.horarioFinal
        }
    }).then(() => {
        res.render('/Bilheteria')
    });
});

app.post('/removeIngresso', (req, res) => {
    Ingresso.destroy({
        where: {
            ingressoId: req.body.ingressoId
        }
    }).then(() => {
        res.render('/Ingresso')
    });
});

app.post('/removeSupervisiona', (req, res) => {
    Supervisiona.destroy({
        where: {
            veterinarioCPF: req.body.veterinarioCPF,
            especieId: req.body.especieId
        }
    }).then(() => {
        res.render('/Veterinario')
    });
});

app.post('/removeTrabalha', (req, res) => {
    Trabalha.destroy({
        where: {
            sevicoGeraisCPF: req.body.servicosGeraisCPF,
            alaId: req.body.alaId,
            horarioInicio: req.body.horarioInicio,
            horarioFim: req.body.horarioFim
        }
    }).then(() => {
        res.render('/ServicosGerais')
    });
});

app.post('/removeAnimal', (req, res) => {
    Animal.update({
        ativo: false,
        where: {
            animalId: req.body.animalId
        }
    }).then(() => {
        res.render('/animal')
    });
});

app.post('/removeBilheteiro', (req, res) => {
    Bilheteiro.update({
        ativo: false,
        where: {
            bilheteiroCPF: req.body.bilheteiroCPF
        }
    }).then(() => {
        res.render('/Bilheteiro')
    });
});

app.post('/removeServicosGerais', (req, res) => {
    ServicosGerais.update({
        ativo: false,
        where: {
            servicosGeraisCPF: req.body.servicosGeraisCPF
        }
    }).then(() => {
        res.render('/ServicosGerais')
    });
});

app.post('/removeVeterinario', (req, res) => {
    Veterinario.update({
        ativo: false,
        where: {
            veterinarioCPF: req.body.veterionarioCPF
        }
    }).then(() => {
        res.render('/Veterinario')
    });
});

//FUNÇÕES DE BUSCA TODOS

app.get('/buscatodosCuida', (req, res) => {
    Cuida.findAll({
        atributes: ['CPF', 'numBilheteria']
    }).then(() => {
        res.redirect('/select/Cuida')
    });
});

app.get('/buscatodosHorarioAla', (req, res) => {
    HorarioAla.findAll({
        atributes: ['cod', 'horario']
    }).then(() => {
        res.render('/select/Ala')
    });
});

app.get('/buscatodosHorarioBilheteria', (req, res) => {
    HorarioBilheteria.findAll({
        atributes: ['cod', 'horarioInicio', 'horarioFinal']
    }).then(() => {
        res.render('/select/Bilheteria')
    });
});

app.get('/buscatodosSupervisiona', (req, res) => {
    Supervisiona.findAll({
        atributes: ['CPF', 'codEspecie']
    }).then(() => {
        res.redirect('/Veterinario')
    });
});

app.get('/buscatodosTrabalha', (req, res) => {
    Trabalha.findAll({
        atributes: ['CPF', 'codAla', 'horarioInicio', 'horarioFim']
    }).then(() => {
        res.redirect('/ServicosGerais')
    });
});

//FUNÇÕES DE INSERÇÃO

app.post("/insereAla", (req, res) => {
    var nome = req.body.nome;
    var localizacao = req.body.localizacao;
    var horario = req.body.horario;
    Ala.create({
        localizacao: localizacao,
        nome: nome
    }).then((inserido) => {
        HorarioAla.create({
            alaId: inserido.id,
            horario: horario
        }).then(() => {
            res.redirect('/insert/Ala');
        })
    });
});

app.post("/insereAnimal", (req, res) => {
    var nome = req.body.nome;
    var sexo = req.body.sexo;
    var dataNascimento = req.body.dataNascimento;
    var codEspecie = req.body.codEspecie;
    Animal.create({
        nome: nome,
        sexo: sexo,
        dataNascimento: dataNascimento,
        especieId: codEspecie,
        ativo: true
    }).then(() => {
        res.redirect("/insert/Animal")
    });
});

app.post("/insereBilheteiro", (req, res) => {
    var CPF = req.body.CPF;
    var ddn = req.body.ddn;
    var nome = req.body.nome;
    var Salario = req.body.Salario;
    var CLT = req.body.CLT;
    var Endereço = req.body.Endereço;
    var Banco = req.body.Banco;
    var Agencia = req.body.Agencia;
    var Conta = req.body.Conta;
    var Digito = req.body.Digito;
    var numBilheteria = req.body.numBilheteria;
    Bilheteiro.create({
        CPF: CPF,
        ddn: ddn,
        nome: nome,
        Salario: Salario,
        CLT: CLT,
        Endereço: Endereço,
        Banco: Banco,
        Agencia: Agencia,
        Conta: Conta,
        Digito: Digito,
        bilheteriaId: numBilheteria,
        ativo: true
    }).then((inserido) => {
        Cuida.create({
            bilheteiroCPF: inserido.CPF,
            bilheteriaId: numBilheteria
        }).then(() => {
            res.redirect("/insert/Bilheteiro")
        });
    });
});

app.post("/insereAtende", (req, res) => {
    var CPF = req.body.CPF;
    var codAnimal = req.body.codAnimal;
    var data = req.body.data;
    var diagnostico = req.body.diagnostico;
    
    Atende.create({
        veterinarioCPF: CPF,
        animalId: codAnimal,
        data: data,
        diagnostico: diagnostico,
    }).then(() => {
        res.redirect("/insert/Atende")
    });
});

app.post("/insereBilheteria", (req, res) => {
    var localizacao = req.body.localizacao;
    var horarioInicio = req.body.horarioInicio;
    var horarioFinal = req.body.horarioFinal;
    Bilheteria.create({
        localizacao: localizacao
    }).then((inserido) => {
        HorarioBilheteria.create({
            bilheteriaId: inserido.id,
            horarioInicio: horarioInicio,
            horarioFinal: horarioFinal
        }).then(() => {
            res.redirect("/insert/Bilheteria")
        })

    });
});


app.post("/insereEspecie", (req, res) => {
    var nomeCientifico = req.body.nomeCientifico;
    var nomePopular = req.body.nomePopular;
    var estado = req.body.estado;
    var alimentacao = req.body.alimentacao;
    var descricao = req.body.descricao;
    var codAla = req.body.codAla;
    Especie.create({
        nomeCientifico: nomeCientifico,
        nomePopular: nomePopular,
        estado: estado,
        alimentacao: alimentacao,
        descricao: descricao,
        alaId: codAla
    }).then(() => {
        res.redirect("/insert/Especie")
    });
});


app.post("/insereServicosGerais", (req, res) => {
    var CPF = req.body.CPF;
    var ddn = req.body.ddn;
    var nome = req.body.nome;
    var Salario = req.body.Salario;
    var CLT = req.body.CLT;
    var Endereço = req.body.Endereço;
    var Banco = req.body.Banco;
    var Agencia = req.body.Agencia;
    var Conta = req.body.Conta;
    var Digito = req.body.Digito;
    var funcao = req.body.funcao;
    ServicosGerais.create({
        CPF: CPF,
        ddn: ddn,
        nome: nome,
        Salario: Salario,
        CLT: CLT,
        Endereço: Endereço,
        Banco: Banco,
        Agencia: Agencia,
        Conta: Conta,
        Digito: Digito,
        funcao: funcao,
        ativo: true
    }).then((inserido) => {
        Trabalha.create({
            servicosGeraisCPF: CPF,
            alaId: codAla,  
        })
        res.redirect("/")
    });
});

app.post("/insereSupervisiona", (req, res) => {
    var CPF = req.body.CPF;
    var codEspecie = req.body.codEspecie;
    Supervisiona.create({
        veterinarioCPF: CPF,
        especieId: codEspecie
    }).then(() => {
        res.redirect("/")
    });
});

app.post("/insereTrabalha", (req, res) => {
    var CPF = req.body.CPF;
    var horarioInicio = req.body.horarioInicio;
    var horariofim = req.body.horariofim;
    var codAla = req.body.codAla;
    Trabalha.create({
        servicosGeraisCPF: CPF,
        horarioInicio: horarioInicio,
        horariofim: horariofim,
        alaId: codAla
    }).then(() => {
        res.redirect("/")
    });
});

app.post("/insereVeterinario", (req, res) => {
    var CPF = req.body.CPF;
    var ddn = req.body.ddn;
    var nome = req.body.nome;
    var Salario = req.body.Salario;
    var CLT = req.body.CLT;
    var Endereço = req.body.Endereço;
    var Banco = req.body.Banco;
    var Agencia = req.body.Agencia;
    var Conta = req.body.Conta;
    var Digito = req.body.Digito;
    var CRMV = req.body.CRMV;
    var Faculdade = req.body.Faculdade
    var ativo = req.body.ativo;
    Veterinario.create({
        CPF: CPF,
        ddn: ddn,
        nome: nome,
        Salario: Salario,
        CLT: CLT,
        Endereço: Endereço,
        Banco: Banco,
        Agencia: Agencia,
        Conta: Conta,
        Digito: Digito,
        CRMV: CRMV,
        Faculdade: Faculdade,
        ativo: ativo
    }).then(() => {
        res.redirect("/")
    });
});

/*-----------FIM ROTAS-----------*/
app.listen(8000, () => {
    console.log("Site rodando");
});