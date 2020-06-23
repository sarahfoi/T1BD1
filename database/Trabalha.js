const Sequelize = require('sequelize');
const connection = require('./database');
const Ala = require('./Ala')
const ServicosGerais = require('./ServicosGerais')

const Trabalha = connection.define( 'trabalha',{
    
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

Trabalha.belongsTo(Ala, {primaryKey: true, foreignKey: {
    allowNull: false}, onDelete: 'CASCADE'});
Trabalha.belongsTo(ServicosGerais, {primaryKey: true, foreignKey: {
    allowNull: false}, onDelete: 'CASCADE'})

Trabalha.sync({force:false})
module.exports = Trabalha