const Sequelize = require('sequelize');
const connection = require('./database');

const Especie = connection.define( 'especie',{
    codEspecie:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nomeCientifico:{
        type: Sequelize.STRING,
        allowNull: false
    },
    nomePopular:{
        type: Sequelize.STRING,
        allowNull: false
    },
    estado:{
        type: Sequelize.STRING,
        allowNull: false
    },
    alimentacao:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.STRING,
        allowNull: false
    },
    codAla:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
},{
    freezeTableName: true,
    tableName: 'especie'
})

Especie.sync({force:false})
module.exports = Especie
