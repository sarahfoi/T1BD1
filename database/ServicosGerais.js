const Sequelize = require('sequelize');
const connection = require('./database');

const ServicosGerais = connection.define( 'servicosGerais',{
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
    funcao:{
        type: Sequelize.STRING,
        allowNull: false
    },
    ativo:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
},{
    freezeTableName: true,
    tableName: 'servicosGerais'
})

ServicosGerais.sync({force:false})
module.exports = ServicosGerais