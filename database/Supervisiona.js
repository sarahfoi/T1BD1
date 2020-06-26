const Sequelize = require('sequelize');
const connection = require('./database');
const Veterinario = require('./Veterinario');
const Especie = require('./Especie');
const { INTEGER } = require('sequelize');

const Supervisiona = connection.define( 'supervisiona',{
    veterinarioCPF:{
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    especieId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    }
},{
    freezeTableName: true,
    tableName: 'supervisiona'
})

Supervisiona.belongsTo(Veterinario, {foreignKey: 'veterinarioCPF', targetKey: 'CPF', onDelete: 'CASCADE'});

Supervisiona.belongsTo(Especie, {foreignKey: 'especieId', targetKey: 'id', onDelete: 'CASCADE'});



Supervisiona.sync({force:false})
module.exports = Supervisiona