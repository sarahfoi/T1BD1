const Sequelize = require('sequelize');
const connection = require('./database');
const Veterinario = require('./Veterinario');
const Animal = require('./Animal');
const { INTEGER } = require('sequelize');

const Supervisiona = connection.define( 'supervisiona',{
    CPF:{
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    }
},{
    freezeTableName: true,
    tableName: 'superviona'
})

Supervisiona.belongsTo(Veterinario, {foreignKey: 'CPF', targetKey: 'CPF', onDelete: 'CASCADE'});

Supervisiona.belongsTo(Animal, {primaryKey: true, onDelete: 'CASCADE'});



Supervisiona.sync({force:false})
module.exports = Supervisiona