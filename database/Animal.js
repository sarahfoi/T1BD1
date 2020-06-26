const Sequelize = require('sequelize');
const connection = require('./database');
const Especie = require('./Especie')

const Animal = connection.define( 'animal',{
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    sexo:{
        type: Sequelize.CHAR,
        allowNull: false
    },
    dataNascimento:{
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    ativo:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
},{
    freezeTableName: true,
    tableName: 'animal'
});

Animal.belongsTo(Especie, {foreignKey: {
    allowNull: false}, onDelete: 'CASCADE'});

Animal.sync({force:false});

module.exports = Animal;