const Sequelize = require('sequelize');
const connection = require('./database');
const Veterinario = require('./Veterinario');
const Animal = require('./Animal');

const Atende = connection.define( 'atende',{
    veterinarioCPF:{
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    animalId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
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

Atende.belongsTo(Veterinario, {foreignKey: 'veterinarioCPF', targetKey: 'CPF', onDelete: 'CASCADE'});

Atende.belongsTo(Animal, {foreignKey: 'animalId', targetKey: 'id', onDelete: 'CASCADE'});



Atende.sync({force:false})
module.exports = Atende