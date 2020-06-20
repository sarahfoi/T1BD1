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
},{
    freezeTableName: true,
    tableName: 'cuida'
})

Cuida.sync({force:false})
module.exports = Cuida