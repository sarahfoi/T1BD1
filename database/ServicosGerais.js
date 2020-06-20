const Sequelize = require('sequelize');
const connection = require('./database');

const ServicosGerais = connection.define( 'serviçosgerais',{
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
        type: Sequelize.Integer,
        allowNull: false
    },
    Digito:{
        type: Sequelize.CHAR,
        allowNull: false
    },
    funcao:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

ServicosGerais.sync({force:false})