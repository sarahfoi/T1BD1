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
})

Ala.sync({force:false})
