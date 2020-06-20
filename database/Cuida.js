const Sequelize = require('sequelize');
const connection = require('./database');

const Cuida = connection.define( 'cuida',{
    CPF:{
        type: Sequelize.STRING,
        allowNull: false
    },
    numBilheteria:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
})

Cuida.sync({force:false})