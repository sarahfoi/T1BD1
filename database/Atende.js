const Sequelize = require('sequelize');
const connection = require('./database');

const Atende = connection.define( 'atende',{
    cod:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    CPF:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    data:{
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    diagnostico:{
        type: Sequelize.STRING,
        allowNull: false
    },
    codAnimal:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
},{
    freezeTableName: true,
    tableName: 'atende'
})

Atende.sync({force:false})
module.exports = Atende