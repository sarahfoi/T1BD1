const Sequelize = require('sequelize');
const connection = require('./database');

const Veterinario = connection.define( 'veterinario',{
    CPF:{
        type: Sequelize.STRING,
        allowNull: false
    },
    Nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    ddn:{
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    Salario:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
    CLT:{
        type: Sequelize.STRING,
        allowNull: false
    },
    Endereço:{
        type: Sequelize.STRING,
        allowNull: false
    },
    Banco:{
        type: Sequelize.STRING,
        allowNull: false
    },
    Agencia:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Conta:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Digito:{
        type: Sequelize.CHAR,
        allowNull: false
    },
    CRMV:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Faculdade:{
        type: Sequelize.STRING,
        allowNull: false
    },
    Ativo:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})

Veterinario.sync({force:false})