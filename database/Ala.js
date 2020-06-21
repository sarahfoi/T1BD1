const Sequelize = require('sequelize');
const connection = require('./database');

const Ala = connection.define( 'ala',{
    cod:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    localizacao:{
        type: Sequelize.STRING,
        allowNull: false
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    freezeTableName: true,
    tableName: 'ala'
});

function insere(req){
    var cod= req.body.cod;
    var localizacao= req.body.localizacao;
    var nome=req.body.nome;
    Ala.create({
        cod:cod,
        localizacao:localizacao,
        nome:nome
})
}

Ala.sync({force:false});
module.exports = Ala;
