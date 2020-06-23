const Sequelize = require('sequelize');
const connection = require('./database');
const Veterinario = require('./Veterinario');
const Animal = require('./Animal');

const Atende = connection.define( 'atende',{
    data:{
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    diagnostico:{
        type: Sequelize.STRING,
        allowNull: false
    },
    
},{
    freezeTableName: true,
    tableName: 'atende'
})

Atende.belongsTo(Veterinario, {foreignKey: {
    allowNull: false}, onDelete: 'CASCADE'});

Atende.belongsTo(Animal, {foreignKey: {
    allowNull: false}, onDelete: 'CASCADE'});



Atende.sync({force:false})
module.exports = Atende