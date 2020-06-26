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
    Especie.findAll({
        atributes: ['id', 'nomeCientifico']
    }).then(resultado => {
        res.render('insert', {
            tabela: 'Animal',
            resultado: resultado
        })
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
    Ala.findAll({
        atributes: ['id', 'nome']
    }).then(resultado => {
        res.render('insert', {
            tabela: 'Especie',
            resultado: resultado
        })
    })

});

app.get('/insert/ServicosGerais', (req, res) => {
    res.render('insert', {
        tabela: 'ServicosGerais'
    })
});

app.get('/insert/Veterinario', (req, res) => {
    Especie.findAll({
        atributes: ['id', 'nomeCientifico']
    }).then((resultado => {
        res.render('insert', {
            tabela: 'Veterinario',
            resultado: resultado
        })
    }))
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

// TELAS DE UPDATE

app.get('/update/Ala/:id', (req, res) => {
    var id = req.params.id;
    //console.log(id)
    Ala.findOne({
        where: { id: id }
    }).then(elem0 => {
        HorarioAla.findOne({
            where: { alaId: id }
        }).then(elem1 => {
            var elem = { elem0, elem1 }
            res.render('update', {
                tabela: 'Ala',
                elem: elem
            })
        })
    })
})

app.get('/update/Animal/:id', (req, res) => {
    var id = req.params.id;
    //console.log(id)
    Animal.findOne({
        where: { id: id }
    }).then(elem => {
        res.render('update', {
            tabela: 'Animal',
            elem: elem
        })
    })
})

app.get('/update/Atende/:veterinarioCPF/:animalId', (req, res) => {
    var veterinarioCPF = req.params.veterinarioCPF;
    var animalid = req.params.animalId;
    //console.log(id)
    Atende.findOne({
        where: {
            veterinarioCPF: veterinarioCPF,
            animalId: animalid
        }
    }).then(elem => {
        res.render('update', {
            tabela: 'Atende',
            elem: elem
        })
    })
})

app.get('/update/Bilheteria/:id', (req, res) => {
    var id = req.params.id;
    //console.log(id)
    Bilheteria.findOne({
        where: { id: id }
    }).then(elem => {
        res.render('update', {
            tabela: 'Bilheteria',
            elem: elem
        })
    })
})

app.get('/update/Especie/:id', (req, res) => {
    var id = req.params.id;
    //console.log(id)
    Especie.findOne({
        where: { id: id }
    }).then(elem => {
        res.render('update', {
            tabela: 'Especie',
            elem: elem
        })
    })
})

app.get('/update/Ingresso/:id', (req, res) => {
    var id = req.params.id;
    //console.log(id)
    Ingresso.findOne({
        where: { id: id }
    }).then(elem => {
        res.render('update', {
            tabela: 'Ingresso',
            elem: elem
        })
    })
})


app.get('/update/ServicosGerais/:CPF', (req, res) => {
    var CPF = req.params.CPF;
    //console.log(CPF)
    ServicosGerais.findOne({
        where: { CPF: CPF }
    }).then(elem0 => {
        Trabalha.findOne({
            where: { servicosGeraisCPF: CPF }
        }).then(elem1 => {
            var elem = {elem0, elem1}
            res.render('update', {
                tabela: 'ServicosGerais',
                elem: elem
            })
        })

    })
})


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
        atributes: ['id', 'nome', 'sexo', 'dataNascimento', 'especieId']
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
            Ativo: true
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
        atributes: ['id', 'Localizacao']
    }).then(resultado => {
        res.render('select', {
            tabela: "Bilheteria",
            resultado: resultado,
            insert: '/insert/Bilheteria'
        });
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

app.get('/select/ServicosGerais', (req, res) => {

    var resultado = [];
    ServicosGerais.findAll({
        where: {
            ativo: true
        },
        atributes: ['CPF', 'Nome', 'ddn', 'Salario', 'CLT', 'Endereço', 'Banco', 'Agencia', 'Conta', 'Digito', 'funcao']
    }).then((funcionarios) => {
        funcionarios.forEach(funcionario => {
            Trabalha.findAll({
                where: {
                    servicosGeraisCPF: funcionario.CPF
                },
            }).then((trabalho) => {
                var newObject = { funcionario, trabalho };
                resultado.push(newObject);
                res.render('select', {
                    tabela: "ServicosGerais",
                    resultado: resultado,
                    insert: '/insert/ServicosGerais'
                });
            })
        });
    })
});

app.get('/select/Veterinario', (req, res) => {
    var resultado = [];
    Veterinario.findAll({
        where: {
            Ativo: true
        },
        atributes: ['CPF', 'Nome', 'ddn', 'Salario', 'CLT', 'Endereço', 'Banco', 'Agencia', 'Conta', 'Digito', 'CRMV', 'Faculdade']
    }).then((funcionarios) => {
        funcionarios.forEach(funcionario => {
            Supervisiona.findAll({
                where: {
                    veterinarioCPF: funcionario.CPF
                },
                atributes: ['especieId']
            }).then((especies) => {
                var newObject = { funcionario, especies }
                console.log(newObject.funcionario.Nome);
                resultado.push(newObject);
                res.render('select', {
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

app.get('/removeAla/:id', (req, res) => {
    var id = req.params.id;
    Ala.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/select/Ala')
    });
});

app.get('/removeAtende/:veterinarioCPF/:animalId', (req, res) => {
    var veterinarioCPF = req.params.veterinarioCPF;
    var animalId = req.params.animalId;
    Atende.destroy({
        where: {
            veterinarioCPF: veterinarioCPF,
            animalId: animalId
        }
    }).then(() => {
        res.redirect('/select/Atende')
    });
});

app.get('/removeBilheteria/:id', (req, res) => {
    var id = req.params.id;
    Bilheteria.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/select/Bilheteria')
    });
});

app.get('/removeEspecie/:id', (req, res) => {
    var id = req.params.id;
    Especie.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/select/Especie')
    });
});

app.get('/removeIngresso/:id', (req, res) => {
    var id = req.params.id;
    Ingresso.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/select/Ingresso')
    });
});

app.get('/removeAnimal/:id', (req, res) => {
    var id = req.params.id;
    Animal.update({
        ativo: false
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/select/Animal')
    });
});

app.get('/removeBilheteiro/:CPF', (req, res) => {
    var CPF = req.params.CPF;
    Bilheteiro.update({
        Ativo: false
    }, {
        where: {
            CPF: CPF
        }
    }).then(() => {
        res.redirect('/select/Bilheteiro')
    });
});

app.get('/removeServicosGerais/:CPF', (req, res) => {
    var CPF = req.params.CPF;
    ServicosGerais.update({
        ativo: false
    }, {
        where: {
            CPF: CPF
        }
    }).then(() => {
        res.redirect('/select/ServicosGerais')
    });
});

app.get('/removeVeterinario/:CPF', (req, res) => {
    var CPF = req.params.CPF;
    Veterinario.update({
        Ativo: false
    }, {
        where: {
            CPF: CPF
        }
    }).then(() => {
        res.redirect('/select/Veterinario')
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
        Nome: nome,
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
        Localizacao: localizacao
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
    var alaId = req.body.codAla;
    var horarioInicio = req.body.horarioInicio;
    var horarioFinal = req.body.horarioFinal;
    console.log(nome)
    ServicosGerais.create({
        CPF: CPF,
        ddn: ddn,
        Nome: nome,
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
            servicosGeraisCPF: inserido.CPF,
            alaId: alaId,
            horariofim: horarioFinal,
            horarioInicio: horarioInicio
        })
        res.redirect("/insert/ServicosGerais")
    });
});

app.post("/insereVeterinario", (req, res) => {
    var CPF = req.body.CPF;
    var ddn = req.body.ddn;
    var Nome = req.body.nome;
    var Salario = req.body.Salario;
    var CLT = req.body.CLT;
    var Endereço = req.body.Endereço;
    var Banco = req.body.Banco;
    var Agencia = req.body.Agencia;
    var Conta = req.body.Conta;
    var Digito = req.body.Digito;
    var CRMV = req.body.CRMV;
    var Faculdade = req.body.faculdade
    var especieId = req.body.codEspecie;
    Veterinario.create({
        CPF: CPF,
        ddn: ddn,
        Nome: Nome,
        Salario: Salario,
        CLT: CLT,
        Endereço: Endereço,
        Banco: Banco,
        Agencia: Agencia,
        Conta: Conta,
        Digito: Digito,
        CRMV: CRMV,
        Faculdade: Faculdade,
        Ativo: true
    }).then((inserido) => {
        Supervisiona.create({
            veterinarioCPF: inserido.CPF,
            especieId: especieId
        }).then(() => {
            res.redirect('/insert/Veterinario');
        })
    });
});

app.post('/insereIngresso', (req, res) => {
    var preco = req.body.preco;
    var numBilheteria = req.body.numBilheteria;
    Ingresso.create({
        preco: preco,
        bilheteriaId: numBilheteria
    }).then(() => {
        res.redirect('/select/Ingresso')
    })

})

//FUNÇÕES DE UPDATE

app.post('/atualizaAla/', (req, res) => {
    Ala.update({
        nome: req.body.nome,
        localizacao: req.body.localizacao
    },
        {
            where: {
                id: req.body.cod
            }
        }).then(() => {
            res.redirect('/select/Ala')
        });
});

app.post('/atualizaAnimal', (req, res) => {
    Animal.update({
        nome: req.body.nome,
        sexo: req.body.sexo,
        dataNascimento: req.body.dataNascimento,
        especieId: req.body.especieId
    },
        { where: { id: req.body.cod } }).then(() => {
            res.redirect('/select/Animal')
        });
});

app.post('/atualizaAtende', (req, res) => {
    console.log(req.body.codAnimal);
    Atende.update({
        veterinarioCPF: req.body.veterinarioCPF,
        animalId: req.body.codAnimal,
        data: req.body.data,
        diagnostico: req.body.diagnostico
    },
        {
            where: {
                veterinarioCPF: req.body.veterinarioCPF,
                animalId: req.body.codAnimal
            }
        }).then((x) => {
            console.log(x);
            res.redirect('/select/Atende')
        }).catch(x => {
            console.log(x);
        });
});

app.post('/atualizaBilheteria', (req, res) => {
    Bilheteria.update({
        Localizacao: req.body.Localizacao
    }, {
        where: {
            id: req.body.id
        }
    }).then(() => {
        res.redirect('/select/Bilheteria')
    });
});

app.post('/atualizaEspecie', (req, res) => {
    Especie.update({
        nomeCientifico: req.body.nomeCientifico,
        nomePopular: req.body.nomePopular,
        estado: req.body.estado,
        alimentacao: req.body.alimentacao,
        descricao: req.body.descricao,
        alaId: req.body.alaId
    }, {
        where: {
            id: req.body.codEspecie
        }
    }).then(() => {
        res.redirect('/select/Especie')
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
        bilheteriaId: req.body.bilheteriaId
    }, {
        where: {
            CPF: req.body.CPF
        }
    }).then(() => {
        res.redirect('/select/Bilheteiro')
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
        funcao: req.body.funcao
    }, {
        where: {
            CPF: req.body.CPF
        }
    }).then(() => {
        res.redirect('/select/ServicosGerais')
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
        Faculdade: Faculdade
    }, {
        where: {
            CPF: req.body.CPF
        }
    }).then(() => {
        res.redirect('/select/Veterinario')
    });
});




/*-----------FIM ROTAS-----------*/
app.listen(8000, () => {
    console.log("Site rodando");
});