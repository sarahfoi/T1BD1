const Sequelize = require('sequelize');
const connection = require('./database');

const Trabalha = connection.define( 'trabalha',{
    CPF:{
        type: Sequelize.STRING,
        allowNull: false
    },
    codAla:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    horarioInicio:{
        type: Sequelize.TIME,
        allowNull: false
    },
    horariofim:{
        type: Sequelize.TIME,
        allowNull: false
    },

})

Trabalha.sync({force:false})