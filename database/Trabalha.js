const Sequelize = require('sequelize');
const connection = require('./database');
const Ala = require('./Ala')
const ServicosGerais = require('./ServicosGerais')

const Trabalha = connection.define( 'trabalha',{
    alaId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    servicosGeraisCPF:{
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    horarioInicio:{
        type: Sequelize.TIME,
        allowNull: false,
        primaryKey: true
    },
    horariofim:{
        type: Sequelize.TIME,
        allowNull: false,
        primaryKey: true
    },

},{
    freezeTableName: true,
    tableName: 'trabalha'
})

Trabalha.belongsTo(Ala, {foreignKey: 'alaId', targetKey: 'id', onDelete: 'CASCADE'});
Trabalha.belongsTo(ServicosGerais, {foreignKey: 'servicosGeraisCPF', targetKey: 'CPF' , onDelete: 'CASCADE'})

Trabalha.sync({force:false})
module.exports = Trabalha