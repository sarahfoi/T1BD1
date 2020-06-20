const Sequelize = require('sequelize');
const connection = require('./database');

const Bilheteria = connection.define( 'bilheteria',{
    numBilheteria:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Localizacao:{
        type: Sequelize.STRING,
        allowNull: false
    },
})

Bilheteria.sync({force:false})