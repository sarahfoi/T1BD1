const Sequelize = require('sequelize');
const connection = require('./database');

const Animal = connection.define( 'animal',{
    cod:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    sexo:{
        type: Sequelize.CHAR,
        allowNull: false
    },
    dataNascimento:{
        type: Sequelize.DATE,
        allowNull: false
    },
    codEspecie:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ativo:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
},{
    freezeTableName: true,
    tableName: 'animal'
})

Animal.sync({force:false})

module.exports = Animal