const Sequelize = require('sequelize');
const connection = require('./database');

const Supervisiona = connection.define( 'supervisiona',{
    CPF:{
        type: Sequelize.STRING,
        allowNull: false
    },
    codEspecie:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
})

Supervisiona.sync({force:false})