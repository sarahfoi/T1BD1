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

app.get('/sobre', (req, res) => {
    res.render('sobre');
})


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
        tabela: 'Home',
        resultado: false
    })
});

app.get('/select/Ala', (req, res) => {
    Ala.findAll({
        atributes: ['localizacao', 'nome']
    }).then((resultado) => {
        res.render('select', {
            tabela: 'Ala',
            resultado: resultado,
            insert: '/insert/Ala'
        })
    })
});

app.get('/select/Animal', (req, res) => {
    Animal.findAll({
        where: {
            ativo: true
        },
        atributes: ['id','nome', 'sexo', 'dataNascimento', 'especieId']
    }).then((resultado) => {
        res.render('select', {
            tabela: 'Animal',
            resultado: resultado,
            insert: '/insert/Animal'
        })
    })
});

app.get('/select/Atende', (req, res) => {
    Atende.findAll({
        atributes: ['animalId', 'veterinarioCPF', 'data', 'diagnostico']
    }).then((resultado) => {
        res.render('select', {
            tabela: 'Atende',
            resultado: resultado,
            insert: '/insert/Atende'
        })
    })
});

app.get('/select/Bilheteiro', (req, res) => {
    Bilheteiro.findAll({
        where: {
            ativo: true
        },
        atributes: ['CPF', 'Nome', 'ddn', 'Salario', 'CLT', 'Endereço', 'Banco', 'Agencia', 'Conta', 'Digito', 'bilheteriaId']
    }).then((resultado) => {
        res.render('select', {
            tabela: 'Bilheteiro',
            resultado: resultado,
            insert: '/insert/Bilheteiro'
        })
    })
});

app.get('/select/Bilheteria', (req, res) => {
    Bilheteria.findAll({
        atributes: ['bilheteriaId', 'localizacao']
    }).then((resultado) => {
        res.render('select', {
            tabela: 'Bilheteria',
            resultado: resultado,
            insert: '/insert/Bilheteria'
        })
    })
});

app.get('/select/Especie', (req, res) => {
    Especie.findAll({
        atributes: ['id', 'nomeCientifico', 'nomePopular', 'estado', 'alimentacao', 'descricao', 'alaId']
    }).then((resultado) => {
        res.render('select', {
            tabela: 'Especie',
            resultado: resultado,
            insert: '/insert/Especie'
        })
    })
});

app.get('/select/Funcionario', (req, res) => {

    res.render('select', {
        tabela: 'Funcionario',
        resultado: resultado
    });
});

app.get('/select/ServicosGerais', (req, res) => {

    var resultado=[];
    ServicosGerais.findAll({
        where: {
            ativo: true
        },
        atributes: ['CPF', 'Nome', 'ddn', 'Salario', 'CLT', 'Endereço', 'Banco', 'Agencia', 'Conta', 'Digito', 'funcao']
    }).then((funcionarios) => {
        funcionarios.forEach(funcionario => {
            Trabalha.findAll({
                where: {
                    CPF: funcionario.CPF
                },
            }).then((trabalho)=>{
                var newObject = {funcionario,trabalho};
                resultado.push(mewObject);
                res.render('select/ServicosGerais', {
                    tabela: "ServicosGerais"
                });
            })
        });
    })
});

app.get('/select/Veterinario', (req, res) => {
    var resultado=[];
    Veterinario.findAll({
        where: {
            ativo: true
        },
        atributes: ['CPF', 'Nome', 'ddn', 'Salario', 'CLT', 'Endereço', 'Banco', 'Agencia', 'Conta', 'Digito', 'CRMV', 'Faculdade']
    }).then((funcionarios) => {
        funcionarios.forEach(funcionario => {
            Supervisiona.findAll({
                where: {
                    CPF: funcionario.CPF
                },
                atributes: ['especieId']
            }).then((especies)=>{
                var newObject = {funcionario,especie};
                resultado.push(mewObject);
                res.render('/select/Veterinario',{
                    tabela: "Veterinario",
                    resultado: resultado,
                    insert: "/insert/Veterinario"
                });
            })
        });
    })
});

app.get('/select/Ingresso', (req, res) => {
    Ingresso.findAll({
        atributes: ['ingressoId', 'horario', 'data', 'bilheteriaId']
    }).then((resultado) => {
        res.render('select', {
            tabela: 'Ingresso',
            resultado: resultado,
            insert: '/insert/Ingresso'
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
    var Nome = req.body.Nome;
    var Salario = req.body.Salario;
    var CLT = req.body.CLT;
    var Endereço = req.body.Endereço;
    var Banco = req.body.Banco;
    var Agencia = req.body.Agencia;
    var Conta = req.body.Conta;
    var Digito = req.body.Digito;
    var CRMV = req.body.CRMV;
    var Faculdade = req.body.Faculdade
    var Ativo = req.body.Ativo;
    //* Pegar o ID da espécie
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
    }).then((inserido) => {
        Supervisiona.create({
            CPF: inserido.CPF,
            especieId: especieId
        }).then(() => {
            res.redirect('/insert/Veterinario');
        })
    });
});

//FUNÇÕES DE UPDATE

app.post('/atualizaAla', (req, res) => {
    Ala.update({
        nome: req.body.nome,
        localizacao: req.body.localizacao,
        horario: req.body.horario,
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.render('/select/Ala')
    });
});

app.post('/atualizaAnimal', (req, res) => {
    Animal.update({
        nome: req.body.nome,
        sexo: req.body.sexo,
        dataNascimento: req.body.dataNascimento,
        especieId: req.body.especieId,
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.render('/select/Animal')
    });
});

app.post('/atualizaAtende', (req, res) => {
    Atende.update({
        veterinarioCPF: req.body.veterinarioCPF,
        animalId: req.body.animalId,
        data: req.body.data,
        diagnostico: req.body.diagnostico,
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.render('/select/Animal')
    });
});

app.post('/atualizaBilheteria', (req, res) => {
    Bilheteria.update({
        localizacao: req.body.localizacao,
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.render('/select/Bilheteria')
    });
});

app.post('/atualizaEspecie', (req, res) => {
    Especie.update({
        nomeCientifico: req.body.nomeCientifico,
        nomePopular: req.body.nomePopular,
        estado: req.body.estado,
        alimentacao: req.body.alimentacao,
        descricao: req.body.descricao,
        alaId: req.body.alaId,
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.render('/select/Especie')
    });
});

app.post('/atualizaBilheteiro', (req, res) => {
    Bilheteiro.update({
        ddn: req.body.ddn,
        nome: req.body.nome,
        Salario: req.body.Salario,
        CLT: req.body.CLT,
        Endereço: req.body.Endereço,
        Banco: req.body.Banco,
        Agencia: req.body.Agencia,
        Conta: req.body.Conta,
        Digito: req.body.Digito,
        bilheteriaId: req.body.bilheteriaId,
        where: {
            CPF: req.body.CPF
        }
    }).then(() => {
        res.render('/select/Bilheteiro')
    });
});

app.post('/atualizaServicosGerais', (req, res) => {
    ServicosGerais.update({
        ddn: req.body.ddn,
        nome: req.body.nome,
        Salario: req.body.Salario,
        CLT: req.body.CLT,
        Endereço: req.body.Endereço,
        Banco: req.body.Banco,
        Agencia: req.body.Agencia,
        Conta: req.body.Conta,
        Digito: req.body.Digito,
        funcao: req.body.funcao,
        where: {
            CPF: req.body.CPF
        }
    }).then(() => {
        res.render('/select/ServicosGerais')
    });
});

app.post('/atualizaVeterinario', (req, res) => {
    ServicosGerais.update({
        ddn: req.body.ddn,
        nome: req.body.nome,
        Salario: req.body.Salario,
        CLT: req.body.CLT,
        Endereço: req.body.Endereço,
        Banco: req.body.Banco,
        Agencia: req.body.Agencia,
        Conta: req.body.Conta,
        Digito: req.body.Digito,
        CRMV: req.body.CRMV,
        Faculdade: Faculdade,
        where: {
            CPF: req.body.CPF
        }
    }).then(() => {
        res.render('/select/Veterinario')
    });
});

/*-----------FIM ROTAS-----------*/
app.listen(8000, () => {
    console.log("Site rodando");
});