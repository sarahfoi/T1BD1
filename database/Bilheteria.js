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
},{
    freezeTableName: true,
    tableName: 'bilheteria'
})

Bilheteria.sync({force:false})
module.exports = Bilheteria