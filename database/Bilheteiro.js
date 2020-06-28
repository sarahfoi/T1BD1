const Sequelize = require('sequelize');
const connection = require('./database');
const Bilheteria = require('./Bilheteria')

const Bilheteiro = connection.define( 'bilheteiro',{
    CPF:{
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
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
        allowNull: false,
        unique: true
    },
    Endereco:{
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
        allowNull: false,
        unique: false
    },
    Digito:{
        type: Sequelize.CHAR,
        allowNull: false
    },
    bilheteriaId:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Ativo:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
},{
    freezeTableName: true,
    tableName: 'bilheteiro'
})

Bilheteiro.belongsTo(Bilheteria, {foreignKey: 'bilheteriaId', targetKey: 'id', onDelete: 'CASCADE'})

Bilheteiro.sync({force:false})
module.exports = Bilheteiro