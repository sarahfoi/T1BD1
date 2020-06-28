const express = require('express');
const app = express();
const sequelize = require("./database/database");
const { QueryTypes, Sequelize } = require('sequelize');
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
const alert_node = require('alert');
const alert = require('alert');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/*-------------ROTAS-------------*/

//HOME
app.get('/', (req, res) => {
    res.render("index");
});

//LOGIN
app.get('/login', (req, res) => {
    res.render('login');
});

//SOBRE
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

    const animais = sequelize.query('SELECT * FROM especie', {
        model: Especie,
        mapToModel: true // pass true here if you have any mapped fields
    }).then(resultado => {
        //console.log(resultado);
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

    const projects = sequelize.query('SELECT * FROM ala', {
        model: Ala,
        mapToModel: true // pass true here if you have any mapped fields
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

    const projects = sequelize.query('SELECT * FROM especie', {
        model: Especie,
        mapToModel: true // pass true here if you have any mapped fields
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
    sequelize.query('SELECT * FROM ala, horarioAla where alaId = :id and id = alaId', {
        replacements: { id: id },
        type: QueryTypes.SELECT
    }).then(elem => {
        //console.log(elem);
        res.render('update', {
            tabela: 'Ala',
            elem: elem
        })
    })
})

app.get('/update/Ala/horarioAla/:id', (req,res)=>{
    //para inserir um novo horário
    var id = req.params.id;
    res.render('insert_ala', {
        ala: id
    });
})

app.get('/update/Animal/:id', (req, res) => {
    var id = req.params.id;
    sequelize.query('SELECT * FROM animal where id = :id', {
        replacements: { id: id },
        type: QueryTypes.SELECT
    }).then(elem => {
        res.render('update', {
            tabela: 'Animal',
            elem: elem[0]
        })
    })
});

app.get('/update/Atende/:veterinarioCPF/:animalId', (req, res) => {
    var veterinarioCPF = req.params.veterinarioCPF;
    var animalId = req.params.animalId;
    const atendes = sequelize.query('SELECT * FROM atende where veterinarioCPF = :CPF and animalId = :id', {
        replacements: { CPF: veterinarioCPF, id: animalId },
        model: Atende,
        type: QueryTypes.SELECT,
        mapToModel: true // pass true here if you have any mapped fields
    }).then(elem => {
        //console.log(elem[0].dataValues);
        res.render('update', {
            tabela: 'Atende',
            elem: elem[0].dataValues
        })
    })
})

app.get('/update/Bilheteria/:id', (req, res) => {
    var id = req.params.id;
    ////console.log(id)
    sequelize.query('SELECT * FROM bilheteria, horarioBilheteria where id = :id and bilheteriaId = :id', {
        replacements: { id: id },
        type: QueryTypes.SELECT
    }).then(elem => {
        console.log(elem);
        res.render('update', {
            tabela: 'Bilheteria',
            elem: elem
        })
    })
})

app.get('/update/Bilheteria/horarioBilheteria/:id', (req,res)=>{
    //para inserir um novo horário
    var id = req.params.id;
    res.render('insert_bilheteria', {
        bilheteria: id
    });
})

app.get('/update/Veterinario/Supervisiona/:id', (req,res)=>{
    var id = req.params.id;
    res.render('insert_veterinario', {
        veterinario: id
    });
})

app.get('/update/Especie/:id', (req, res) => {
    var id = req.params.id;
    sequelize.query('SELECT * FROM especie where id = :id', {
        replacements: { id: id },
        type: QueryTypes.SELECT
    }).then(elem => {
        res.render('update', {
            tabela: 'Especie',
            elem: elem[0]
        })
    })
})

app.get('/update/Ingresso/:id', (req, res) => {
    var id = req.params.id;
    sequelize.query('SELECT * FROM ingresso where id = :id', {
        replacements: { id: id },
        type: QueryTypes.SELECT
    }).then(elem => {
        res.render('update', {
            tabela: 'Ingresso',
            elem: elem[0]
        })
    })
})

app.get('/update/Bilheteiro/:CPF', (req, res) => {
    var CPF = req.params.CPF;
    sequelize.query('SELECT * FROM bilheteiro where CPF = :CPF', {
        replacements: { CPF: CPF },
        type: QueryTypes.SELECT
    }).then(elem => {
        //console.log(elem[0]);
        res.render('update', {
            tabela: 'Bilheteiro',
            elem: elem[0]
        })
    })
})

app.get('/update/ServicosGerais/:CPF', (req, res) => {
    var CPF = req.params.CPF;
    sequelize.query('SELECT * FROM servicosGerais, trabalha WHERE trabalha.servicosGeraisCPF = servicosGerais.CPF AND ativo = :ativo AND servicosGeraisCPF = :CPF;', {
        replacements: {
            CPF: CPF,
            ativo: true
        },
        type: QueryTypes.SELECT
    }).then((elem => {
        console.log(elem);
        res.render('update', {
            tabela: 'ServicosGerais',
            elem: elem
        })
    })).catch(err => {
        //console.log(err);
    });
});

app.get('/update/SG/horarioSG/:id', (req,res)=>{
    //para inserir um novo horário
    var id = req.params.id;
    res.render('insert_sg_horario', {
        servicosgerais: id
    });
});

app.get('/update/Veterinario/:CPF', (req, res) => {
    var CPF = req.params.CPF;
    const resultado = sequelize.query('SELECT * FROM veterinario, supervisiona WHERE veterinarioCPF = :CPF', {
        replacements: { CPF: CPF },
        type: QueryTypes.SELECT
    }).then((elem => {
        res.render('update', {
            tabela: 'Veterinario',
            elem: elem
        })
    })).catch(err => {
        //console.log(err);
    });
});


// TELAS DE CONSULTA TODOS (select)

app.get('/select/Home', (req, res) => {
    res.render('select', {
        tabela: 'Home',
        resultado: false
    })
});

app.get('/select/Ala', (req, res) => {
    var id = req.params.id;
    var resultado;
    var i = 0;
    sequelize.query('SELECT * FROM ala ORDER BY nome ASC', {
        type: QueryTypes.SELECT
    }).then(alas => {
       // //console.log(alas);
        /*alas.forEach(ala => {
            i++;
            sequelize.query('SELECT * FROM horarioAla where alaId = :id', {
                replacements: { id: ala.id },
                type: QueryTypes.SELECT
            }).then((horarios) => {
                const novo = { ala, horarios };
               // //console.log(novo);
                alas[i] = novo;
            })
        });
        //console.log(alas);*/
        res.render('select', {
            tabela: 'Ala',
            resultado: alas,
            insert: '/insert/Ala'
        });
    });
});

app.get('/select/Animal', (req, res) => {
    sequelize.query('SELECT * FROM animal where ativo = :ativo ORDER BY nome asc', {
        replacements: { ativo: true },
        model: Animal,
        mapToModel: true // pass true here if you have any mapped fields
    }).then((resultado) => {
        res.render('select', {
            tabela: 'Animal',
            resultado: resultado,
            insert: '/insert/Animal'
        })
    })
});

app.get('/select/Atende', (req, res) => {
    sequelize.query('SELECT * FROM atende order by data desc', {
        model: Atende,
        mapToModel: true
    }).then((resultado) => {
        res.render('select', {
            tabela: 'Atende',
            resultado: resultado,
            insert: '/insert/Atende'
        })
    })
});


app.get('/select/Bilheteiro', (req, res) => {
    sequelize.query('SELECT * FROM bilheteiro WHERE ativo = :ativo order by Nome asc', {
        replacements: { ativo: true },
        model: Bilheteiro,
        mapToModel: true
    }).then((resultado) => {
        res.render('select', {
            tabela: 'Bilheteiro',
            resultado: resultado,
            insert: '/insert/Bilheteiro'
        })
    })
});

app.get('/select/Bilheteria', (req, res) => {
    sequelize.query('SELECT * FROM bilheteria_v_completa', {
        mapToModel: true
    }).then((resultado) => {
        console.log(resultado);
        res.render('select', {
            tabela: 'Bilheteria',
            resultado: resultado[0],
            insert: '/insert/Bilheteria'
        })
    })
});

app.get('/select/Especie', (req, res) => {
    sequelize.query('SELECT * FROM especie order by nomePopular asc', {
        model: Especie,
        mapToModel: true
    }).then((resultado) => {
        res.render('select', {
            tabela: 'Especie',
            resultado: resultado,
            insert: '/insert/Especie'
        })
    })
});

app.get('/select/ServicosGerais', (req, res) => {
    sequelize.query('SELECT * FROM servicosGerais where ativo = :ativo order by Nome asc', {
        replacements: { ativo: true },
        model: ServicosGerais,
        mapToModel: true
    }).then(resultado => {
        res.render('select', {
            tabela: "ServicosGerais",
            resultado: resultado,
            insert: '/insert/ServicosGerais'
        })
    })
});

app.get('/select/Veterinario', (req, res) => {
    sequelize.query('SELECT * FROM veterinario_v group by Nome order by Nome asc', {
        replacements: { ativo: true },
        mapToModel: true
    }).then(resultado => {
        //console.log(resultado)
        res.render('select', {
            tabela: "Veterinario",
            resultado: resultado[0],
            insert: '/insert/Veterinario'
        })
    })
});

app.get('/select/Ingresso', (req, res) => {
    sequelize.query('SELECT * FROM ingresso order by createdAt desc', {
        model: Ingresso,
        mapToModel: true
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
    sequelize.query('DELETE FROM ala where id = :id', {
        replacements: { id: id }
    }).then(() => {
        res.redirect('/select/Ala')
    });
});

app.get('/removeAtende/:veterinarioCPF/:animalId', (req, res) => {
    var id = req.params.animalId;
    var CPF = req.params.veterinarioCPF;
    sequelize.query('DELETE FROM atende where animalId = :id and veterinarioCPF = :CPF', {
        replacements: { id: id, CPF: CPF }
    }).then(() => {
        res.redirect('/select/Atende')
    });
});

app.get('/removeBilheteria/:id', (req, res) => {
    var id = req.params.id;
    sequelize.query('DELETE FROM bilheteria where id = :id', {
        replacements: { id: id }
    }).then(() => {
        res.redirect('/select/Bilheteria')
    });
});

app.get('/removeEspecie/:id', (req, res) => {
    var id = req.params.id;
    sequelize.query('DELETE FROM especie where id = :id', {
        replacements: { id: id }
    }).then(() => {
        res.redirect('/select/Especie')
    });
});

app.get('/removeIngresso/:id', (req, res) => {
    var id = req.params.id;
    sequelize.query('DELETE FROM ingresso where id = :id', {
        replacements: { id: id }
    }).then(() => {
        res.redirect('/select/Ingresso')
    });
});

app.get('/removeBilheteiro/:CPF', (req, res) => {
    var CPF = req.params.CPF;
    sequelize.query('DELETE FROM bilheteiro_v where CPF = :CPF', {
        replacements: { CPF: CPF }
    }).then(() => {
        res.redirect('/select/Bilheteiro')
    });
});

//Falta: Consertar. Está removendo fisicamente da view e nao ta removendo logicamente da tabela
app.get('/removeServicosGerais/:CPF', (req, res) => {
    var CPF = req.params.CPF;
    sequelize.query('DELETE FROM servicosGerais_v where CPF = :CPF', {
        replacements: { CPF: CPF }
    }).then(() => {
        res.redirect('/select/ServicosGerais')
    });
});

//Falta: Consertar. Body está vindo vazio.
app.get('/removeHorarioSG', (req, res) => {
   // console.log(req.body.servicosGeraisCPF);
    var servicosGeraisCPF = req.body.servicosGeraisCPF;
    var alaId = req.body.alaId;
    var horarioInicio= req.body.horarioInicio;
    var horarioFim=req.body.horarioFim
    sequelize.query('DELETE FROM trabalha where servicosGeraisCPF = :servicosGeraisCPF AND alaId = :alaId AND horarioInicio = :horarioInicio AND horarioFim = :horarioFim', {
        replacements: { servicosGeraisCPF: servicosGeraisCPF, alaId: alaId, horarioInicio: horarioInicio, horarioFim: horarioFim}
    }).then(() => {
        res.redirect('/select/ServicosGerais')
    });
});

app.get('/removeVeterinario/:CPF', (req, res) => {
    var CPF = req.params.CPF;
    sequelize.query('DELETE FROM veterinario_v where CPF = :CPF', {
        replacements: { CPF: CPF }
    }).then(() => {
        res.redirect('/select/veterinario')
    });
});

app.get('/removeAnimal/:id', (req, res) => {
    var id = req.params.id;
    sequelize.query('DELETE FROM animal_v where id = :id', {
        replacements: { id: id }
    }).then(() => {
        res.redirect('/select/animal')
    });
});

app.post('/removeHorarioAla', (req, res) => {
    var alaId = req.body.alaId;
    var horarioInicio = req.body.horarioInicio;
    var horarioFinal = req.body.horarioFinal;
    sequelize.query('DELETE FROM horarioAla where alaId = :alaId AND horarioInicio = :horarioInicio AND horarioFinal = :horarioFinal', {
        replacements: { alaId: alaId,
                        horarioInicio: horarioInicio,
                        horarioFinal: horarioFinal
        }
    }).then(() => {
        res.redirect('/update/Ala/'+alaId);
    });
});

app.post('/removeHorarioBilheteria', (req, res) => {
    var bilheteriaId = req.body.bilheteriaId;
    var horarioInicio = req.body.horarioInicio;
    var horarioFinal = req.body.horarioFinal;
    sequelize.query('DELETE FROM horarioBilheteria where bilheteriaId = :bilheteriaId AND horaioInicio = :horarioInicio AND horarioFinal = :horarioFinal', {
        replacements: { bilheteriaId: bilheteriaId,
                        horarioInicio: horarioInicio,
                        horarioFinal: horarioFinal
        }
    }).then(() => {
        res.redirect('/update/Bilheteria/'+bilheteriaId)
    });
});

app.post('/removeSupervisiona', (req, res) => {
    var veterinarioCPF = req.body.veterinarioCPF;
    var especieId = req.body.especieId;
    sequelize.query('DELETE FROM supervisiona where especieId = :especieId AND veterinarioCPF = :veterinarioCPF', {
        replacements: { veterinarioCPF: veterinarioCPF,
                        especieId: especieId
        }
    }).then(() => {
        res.redirect('/update/Veterinario/'+veterinarioCPF)
    });
});

app.post('/removeTrabalha', (req, res) => {
    var alaId = req.body.alaId;
    var servicosGeraisCPF = req.body.servicosGereaisCPF;
    var horarioInicio = req.body.horaraioInicio;
    var horariofim = req.body.horariofim;
    sequelize.query('DELETE FROM trabalha where alaId = :alaId AND servicoGeraisCPF = :servicosGeraisCPF AND horarioInicio = :horarioInicio AND horariofim = :horariofim', {
        replacements: { servicosGeraisCPF: servicosGeraisCPF,
                        alaId: alaId,
                        horarioInicio: horarioInicio,
                        horariofim: horariofim
        }
    }).then(() => {
        res.redirect('/update/ServicosGerais/'+servicosGeraCPF)
    });
});

//FUNÇÕES DE INSERÇÃO

app.post("/insert/horarioAla", (req, res) => {
    //insere ala e renderiza insert/horarioAla
    var nome = req.body.nome;
    var localizacao = req.body.localizacao;
    var horario = req.body.horario;
    Ala.create({
        localizacao: localizacao,
        nome: nome
    }).then((inserido) => {
        ////console.log(inserido);
        res.render('insert_ala', {
            ala: inserido.id
        });
    }).catch((e) => {
        alert('ERRO AO INSERIR ' + e)
        res.redirect("/insert/Ala")
    });
});

app.post("/insereAla/horario", (req, res) => {
    var horarioInicio = req.body.horarioInicio;
    var horarioFinal = req.body.horarioFinal;
    var alaId = req.body.alaId;
    var today = new Date();
    sequelize.query('INSERT INTO horarioAla (alaId, horarioInicio, horarioFinal, createdAt, updatedAt) VALUES (:alaId, :horarioInicio, :horarioFinal, :createdAt, :updatedAt)', {
        replacements: { alaId: alaId, horarioInicio: horarioInicio, horarioFinal: horarioFinal, createdAt: today, updatedAt: today }
    }).then(() => {
        res.render("insert_ala", {
            ala: alaId
        })
    }).catch((e) => {
        alert('ERRO AO INSERIR ' + e)
        res.redirect("/insert/Ala")
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
    }).catch((e) => {
        alert('ERRO AO INSERIR ' + e)
        res.redirect("/insert/Animal")
    });
});

app.post("/insereBilheteiro", (req, res) => {
    ////console.log(req.body);
    var CPF = req.body.CPF;
    var ddn = req.body.ddn;
    var nome = req.body.nome;
    var Salario = req.body.Salario;
    var CLT = req.body.CLT;
    var Endereco = req.body.Endereco;
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
        Endereco: Endereco,
        Banco: Banco,
        Agencia: Agencia,
        Conta: Conta,
        Digito: Digito,
        bilheteriaId: numBilheteria,
        Ativo: true
    }).then((inserido) => {
        Cuida.create({
            bilheteiroCPF: inserido.CPF,
            bilheteriaId: numBilheteria
        }).then(() => {
            res.redirect("/insert/Bilheteiro")
        }).catch((e) => {
            alert('ERRO AO INSERIR ' + e)
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
    }).catch((e) => {
        alert('ERRO AO INSERIR ' + e)
        res.redirect("/insert/Atende")
    });
});

app.post("/insert/horarioBilheteria", (req, res) => {
    var localizacao = req.body.localizacao;
    Bilheteria.create({
        Localizacao: localizacao
    }).then((inserido) => {
        res.render('insert_bilheteria', {
            bilheteria: inserido.id
        });
    }).catch((e) => {
        alert('ERRO AO INSERIR ' + e);
        res.redirect("/insert/Bilheteria");
    })
});

app.post("/insereBilheteria/horario", (req, res) => {
    var horarioInicio = req.body.horarioInicio;
    var horarioFinal = req.body.horarioFinal;
    var bilheteriaId = req.body.bilheteriaId;
    var today = new Date();
    sequelize.query('INSERT INTO horarioBilheteria (bilheteriaId, horarioInicio, horarioFinal, createdAt, updatedAt) VALUES (:bilheteriaId, :horarioInicio, :horarioFinal, :createdAt, :updatedAt)', {
        replacements: { bilheteriaId: bilheteriaId, horarioInicio: horarioInicio, horarioFinal: horarioFinal, createdAt: today, updatedAt: today }
    }).then(() => {
        res.render("insert_bilheteria", {
            bilheteria: bilheteriaId
        })
    }).catch((e) => {
        alert('ERRO AO INSERIR ' + e)
        res.redirect("/insert/Bilheteria")
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
    }).catch((e) => {
        alert('ERRO AO INSERIR ' + e)
        res.redirect("/insert/Especies")
    });
});

app.post("/insert/horarioSG", (req, res) => {
    var CPF = req.body.CPF;
    var ddn = req.body.ddn;
    var nome = req.body.nome;
    var Salario = req.body.Salario;
    var CLT = req.body.CLT;
    var Endereco = req.body.Endereco;
    var Banco = req.body.Banco;
    var Agencia = req.body.Agencia;
    var Conta = req.body.Conta;
    var Digito = req.body.Digito;
    var funcao = req.body.funcao;
    ////console.log(nome)
    ServicosGerais.create({
        CPF: CPF,
        ddn: ddn,
        Nome: nome,
        Salario: Salario,
        CLT: CLT,
        Endereco: Endereco,
        Banco: Banco,
        Agencia: Agencia,
        Conta: Conta,
        Digito: Digito,
        funcao: funcao,
        ativo: true
    }).then((inserido) => {
        res.render('insert_sg_horario', {
            servicosgerais: inserido.CPF
        });
    }).catch((e) => {
        alert('ERRO AO INSERIR ' + e);
        res.redirect("/insert/ServicosGerais");
    });
});

app.post("/insereSG/horario", (req, res) => {
    console.log(req.body);
    var horarioInicio = req.body.horarioInicio;
    var horariofim = req.body.horariofim;
    var alaId = req.body.alaId;
    var servicosGeraisCPF = req.body.servicosGeraisCPF;
    var today = new Date();
    sequelize.query('INSERT INTO trabalha (alaId, servicosGeraisCPF, horarioInicio, horariofim, createdAt, updatedAt) VALUES (:alaId, :servicosGeraisCPF, :horarioInicio, :horariofim, :createdAt, :updatedAt)', {
        replacements: { alaId: alaId, servicosGeraisCPF: servicosGeraisCPF, horarioInicio: horarioInicio, horariofim: horariofim, createdAt: today, updatedAt: today }
    }).then(() => {
        res.render("insert_sg_horario", {
            servicosgerais: servicosGeraisCPF
        })
    }).catch((e) => {
        alert('ERRO AO INSERIR ' + e)
        res.redirect("/insert/ServicosGerais")
    });
});

//Falta: Consertar. Fala que estou violando a UNIQUE constraint.
app.post("/insert/especieVeterinario", (req, res) => {
    var CPF = req.body.CPF;
    var ddn = req.body.ddn;
    var Nome = req.body.nome;
    var Salario = req.body.Salario;
    var CLT = req.body.CLT;
    var Endereco = req.body.Endereco;
    var Banco = req.body.Banco;
    var Agencia = req.body.Agencia;
    var Conta = req.body.Conta;
    var Digito = req.body.Digito;
    var CRMV = req.body.CRMV;
    var Faculdade = req.body.faculdade
    var especieId = req.body.codEspecie;
    var today = new Date();
    sequelize.query('INSERT INTO veterinario (CPF, ddn, Nome, Salario, CLT, Endereco, Banco, Agencia, Conta, Digito, CRMV, Faculdade, createdAt, updatedAt) VALUES (:CPF, :ddn, :Nome, :Salario, :CLT, :Endereco,:Banco, :Agencia, :Conta, :Digito, :CRMV, :Faculdade, :createdAt,:updatedAt)', {
    replacements: { Agencia: Agencia, CPF: CPF, ddn: ddn, Nome: Nome, Salario: Salario, CLT: CLT, Endereco: Endereco, Banco: Banco, Conta: Conta, Digito: Digito, CRMV: CRMV, Faculdade: Faculdade, createdAt: today, updatedAt: today }
    }).then((inserido) => {
        res.render('insert_veterinario', {
            veterinario: inserido.id
        });
    }).catch((e) => {
        alert('ERRO AO INSERIR ' + e)
        res.redirect("/insert/Veterinario")
    });
});

app.post("/insereVeterinario/especie", (req, res) => {
    //insere no supervisiona
    var veterinarioCPF = req.body.veterinarioCPF;
    var especieId = req.body.especieId;
    var today = new Date();
    sequelize.query('INSERT INTO supervisiona (veterinarioCPF, especieId, createdAt, updatedAt) VALUES (:veterinarioCPF, :especieId, :createdAt, :updatedAt)', {
        replacements: { veterinarioCPF: veterinarioCPF, especieId: especieId, createdAt: today, updatedAt: today }
    }).then(() => {
        res.render("insert_veterinario", {
            veterinario: veterinario
        })
    }).catch((e) => {
        alert('ERRO AO INSERIR ' + e)
        res.redirect("/insert/Veterinario")
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
    }).catch((e) => {
        alert('ERRO AO INSERIR ' + e)
        res.redirect("/insert/Ingresso")
    });
});

//FUNÇÕES DE UPDATE
app.post('/atualizaAla/', (req, res) => {
    sequelize.query(`UPDATE ala SET nome = :nome, localizacao = :localizacao WHERE id = :id;`, {
        replacements: {
            nome: req.body.nome,
            localizacao: req.body.localizacao,
            id: req.body.cod,
            horario: req.body.horario
        }
    }).then(() => {
        res.redirect("/select/Ala")
    }).catch((e) => {
        alert('ERRO AO ATUALIZAR ' + e)
        res.redirect("/select/Ala")
    });
});

app.post('/atualizaAnimal/', (req, res) => {
    sequelize.query('UPDATE animal SET nome= :nome, sexo= :sexo, dataNascimento= :dataNascimento, especieId= :especieId where id= :id;', {
        replacements: {
            nome: req.body.nome,
            sexo: req.body.sexo,
            dataNascimento: req.body.dataNascimento,
            especieId: req.body.codEspecie,
            id: req.body.cod
        }
    }).then(() => {
        res.redirect('/select/Animal')
    }).catch((e) => {
        alert('ERRO AO ATUALIZAR: ' + e)
        res.redirect("/select/Animal")
    });
});

app.post('/atualizaAtende', (req, res) => {
    sequelize.query('UPDATE atende SET data= :data, diagnostico = :diagnostico WHERE veterinarioCPF= :veterinarioCPF AND animalId= :animalId', {
        replacements: {
            veterinarioCPF: req.body.veterinarioCPF,
            animalId: req.body.codAnimal,
            data: req.body.data,
            diagnostico: req.body.diagnostico
        }
    }).then(() => {
        res.redirect('/select/Atende')
    }).catch((e) => {
        alert('ERRO AO ATUALIZAR ' + e)
        res.redirect("/select/Atende")
    });
});

app.post('/atualizaBilheteria', (req, res) => {
    sequelize.query('UPDATE bilheteria SET Localizacao= :Localizacao WHERE id= :id;', {
        replacements: {
            Localizacao: req.body.localizacao,
            id: req.body.numBilheteria
        }

    }).then(() => {
        res.redirect('/select/Bilheteria')
    }).catch((e) => {
        alert('ERRO AO ATUALIZAR ' + e)
        res.redirect("/select/Bilheteria")
    });
});

app.post('/atualizaEspecie', (req, res) => {
    sequelize.query('UPDATE especie SET nomeCientifico = :nomeCientifico, nomePopular = :nomePopular, estado = :estado, alimentacao = :alimentacao, descricao = :descricao, alaId = :alaId WHERE id = :id;', {
        replacements: {
            nomeCientifico: req.body.nomeCientifico,
            nomePopular: req.body.nomePopular,
            estado: req.body.estado,
            alimentacao: req.body.alimentacao,
            descricao: req.body.descricao,
            alaId: req.body.codAla,
            id: req.body.codEspecie
        }
    }).then(() => {
        res.redirect('/select/Especie')
    }).catch((e) => {
        alert('ERRO AO ATUALIZAR ' + e)
        res.redirect("/select/Especie")
    });
});

app.post('/atualizaBilheteiro', (req, res) => {
    ////console.log(req.body);
    sequelize.query('UPDATE bilheteiro SET ddn = :ddn, nome = :nome, Salario = :Salario, CLT = :CLT, Endereco = :Endereco, Banco = :Banco, Agencia = :Agencia, Conta = :Conta, Digito = :Digito, bilheteriaId = :bilheteria WHERE CPF = :CPF;', {
        replacements: {
            ddn: req.body.ddn,
            nome: req.body.nome,
            Salario: req.body.salario,
            CLT: req.body.CLT,
            Endereco: req.body.endereco,
            Banco: req.body.banco,
            Agencia: req.body.agencia,
            Conta: req.body.conta,
            Digito: req.body.digito,
            bilheteria: req.body.numBilheteria,
            CPF: req.body.CPF
        }
    }).then(() => {
        res.redirect('/select/Bilheteiro')
    }).catch((e) => {
        alert('ERRO AO ATUALIZAR ' + e)
        res.redirect("/select/Bilheteiro")
    });
});

app.post('/atualizaServicosGerais', (req, res) => {
    sequelize.query('UPDATE servicosGerais SET ddn = :ddn, Nome = :nome, Salario = :Salario, CLT = :CLT, Endereco = :Endereco, Banco = :Banco, Agencia = Agencia, Conta = :Conta, Digito = :Digito, funcao = :funcao WHERE CPF = :CPF;', {
        replacements: {
            ddn: req.body.ddn,
            nome: req.body.nome,
            Salario: req.body.salario,
            CLT: req.body.CLT,
            Endereco: req.body.endereco,
            Banco: req.body.banco,
            Agencia: req.body.agencia,
            Conta: req.body.conta,
            Digito: req.body.digito,
            funcao: req.body.funcao,
            CPF: req.body.CPF
        }
    }).then(() => {
        sequelize.query('SELECT * FROM servicosGerais, trabalha where servicosGerais.CPF = :CPF AND servicosGerais.CPF = trabalha.servicosGeraisCPF;', {
            CPF: req.body.CPF,
        }).then(() => {
            sequelize.query('UPDATE trabalha SET horarioInicio = :horarioInicio, horariofim = :horarioFinal WHERE servicosGeraisCPF = :CPF;', {
                replacements: {
                    CPF: req.body.CPF,
                    horarioInicio: req.body.horarioInicio,
                    horarioFinal: req.body.horarioFinal
                }
            })
            res.redirect('/select/ServicosGerais')
        }).catch((e) => {
            alert('ERRO AO ATUALIZAR ' + e)
            res.redirect("/select/ServicosGerais")
        });
    })
});

app.post('/atualizaVeterinario', (req, res) => {
  sequelize.query('UPDATE veterinario SET ddn= :ddn, Nome= :Nome, Salario= :Salario, CLT= :CLT, Endereco = :Endereco, Banco = :Banco, Agencia = :Agencia, Conta = :Conta, Digito = :Digito, CRMV = :CRMV, Faculdade = :Faculdade where CPF= :CPF;', {
        replacements: {
            Nome: req.body.nome,
            ddn: req.body.ddn,
            Salario: req.body.salario,
            CLT: req.body.CLT,
            Endereco: req.body.endereco,
            Banco: req.body.banco,
            Agencia: req.body.agencia,
            Digito: req.body.digito,
            CRMV: req.body.CRMV,
            Faculdade: req.body.faculdade,
            CPF: req.body.CPF
        }
    }).then(() => {
        res.redirect('/select/Veterinario')
    }).catch((e) => {
        alert('ERRO AO ATUALIZAR ' + e)
        res.redirect("/select/Veterinario")
    });
});

app.post('/atualizaIngresso', (req, res) => {
    sequelize.query('UPDATE ingresso SET preco= :preco, bilheteriaId = :numBilheteria where id= :id;', {
        replacements: {
            preco: req.body.preco,
            numBilheteria: req.body.numBilheteria,
            id: req.body.num
        }
    }).then(() => {
        res.redirect('/select/Ingresso')
    }).catch((e) => {
        alert('ERRO AO ATUALIZAR ' + e)
        res.redirect("/select/Ingresso")
    });
});
//Funções de Busca

app.get('/select/Financas', (req, res) => {
    sequelize.query('SELECT * FROM ingresso_v')
        .then((resultado) => {
            res.render('select', {
                tabela: 'Financas',
                resultado: resultado,
                insert: undefined
            })
        })
});

app.get('/busca/Ala', (req, res) => {
    var busca = req.query.busca;
    ////console.log(busca);
    sequelize.query('SELECT * FROM ala where nome= :busca OR id= :busca OR localizacao= :busca', {
        replacements: {
            busca: busca
        },
        model: Ala,
        mapToModel: true
    }).then((resultado) => {
        res.render('select', {
            tabela: 'Ala',
            resultado: resultado,
            insert: '/insert/Ala'
        })
    })
});

app.get('/busca/Animal', (req, res) => {
    var busca = req.query.busca;
    sequelize.query('SELECT * FROM animal_v where nome= :busca OR id= :busca OR sexo= :busca OR dataNascimento= :busca OR nomePopular = :busca OR nomeCientifico = :busca OR especieId = :busca OR alaId = :busca', {
        replacements: {
            busca: busca
        },
        model: Animal,
        mapToModel: true
    }).then((resultado) => {
        res.render('select', {
            tabela: 'Animal',
            resultado: resultado,
            insert: '/insert/Animal'
        })
    })
});

app.get('/busca/Atende', (req, res) => {
    var busca = req.query.busca;
    ////console.log(busca);
    sequelize.query('SELECT * FROM atende where veterinarioCPF= :busca OR animalId = :busca OR diagnostico= :busca OR data = :busca', {
        replacements: {
            busca: busca
        },
        model: Atende,
        mapToModel: true
    }).then((resultado) => {
        res.render('select', {
            tabela: 'Atende',
            resultado: resultado,
            insert: '/insert/Atende'
        })
    })
});

app.get('/busca/Bilheteiro', (req, res) => {
    var busca = req.query.busca;
    //console.log(busca);
    sequelize.query('SELECT * FROM bilheteiro where Nome= :busca OR CPF= :busca OR ddn= :busca OR Salario= :busca OR CLT= :busca OR Endereco= :busca OR bilheteriaId = :busca', {
        replacements: {
            busca: busca
        },
        model: Bilheteiro,
        mapToModel: true
    }).then((resultado) => {
        res.render('select', {
            tabela: 'Bilheteiro',
            resultado: resultado,
            insert: '/insert/Bilheteiro'
        })
    })
});

app.get('/busca/Bilheteria', (req, res) => {
    var busca = req.query.busca;
    //console.log(busca);
    sequelize.query('SELECT * FROM bilheteria where id= :busca OR localizacao= :busca', {
        replacements: {
            busca: busca
        },
        model: Bilheteria,
        mapToModel: true
    }).then((resultado) => {
        res.render('select', {
            tabela: 'Bilheteria',
            resultado: resultado,
            insert: '/insert/Bilheteria'
        })
    })
});

app.get('/busca/Especies', (req, res) => {
    var busca = req.query.busca;
    //console.log(busca);
    sequelize.query('SELECT * FROM especie where nomePopular= :busca OR nomeCientifico= :busca OR estado= :busca OR alaId = :busca', {
        replacements: {
            busca: busca
        },
        model: Especie,
        mapToModel: true
    }).then((resultado) => {
        res.render('select', {
            tabela: 'Especie',
            resultado: resultado,
            insert: '/insert/Especie'
        })
    })
});

app.get('/busca/Ingresso', (req, res) => {
    var busca = req.query.busca;
    //console.log(busca);
    sequelize.query('SELECT * FROM ingresso where id= :busca OR bilheteriaId= :busca OR preco= :busca', {
        replacements: {
            busca: busca
        },
        model: Ingresso,
        mapToModel: true
    }).then((resultado) => {
        res.render('select', {
            tabela: 'Ingresso',
            resultado: resultado,
            insert: '/insert/Ingresso'
        })
    })
});

app.get('/busca/Bilheteiro', (req, res) => {
    var busca = req.query.busca;
    //console.log(busca);
    sequelize.query('SELECT * FROM bilheteiro_v where Nome= :busca OR CPF= :busca OR ddn= :busca OR Salario= :busca OR CLT= :busca OR Endereco= :busca OR funcao = :busca OR id = :busca OR nome = :busca OR localizacao = :busca', {
        replacements: {
            busca: busca
        },
        model: Bilheteiro,
        mapToModel: true
    }).then((resultado) => {
        res.render('select', {
            tabela: 'Bilheteiro',
            resultado: resultado,
            insert: '/insert/Bilheteiro'
        })
    })
});

app.get('/busca/Veterinario', (req, res) => {
    var busca = req.query.busca;
    //console.log(busca);
    sequelize.query('SELECT * FROM veterinario_v where Nome= :busca OR CPF= :busca OR ddn= :busca OR Salario= :busca OR CLT= :busca OR Endereco= :busca OR CRMV = :busca OR Faculdade = :busca OR nomePopular = :busca OR nomeCientifico = :busca OR alaId = :busca', {
        replacements: {
            busca: busca
        },
        model: Veterinario,
        mapToModel: true
    }).then((resultado) => {
        res.render('select', {
            tabela: 'Veterinario',
            resultado: resultado,
            insert: '/insert/Veterinario'
        })
    })
});

/*-----------FIM ROTAS-----------*/
app.listen(8000, () => {
    //console.log("Site rodando");
});