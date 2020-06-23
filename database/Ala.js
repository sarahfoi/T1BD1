const Sequelize = require('sequelize');
const connection = require('./database');

const Ala = connection.define( 'ala',{
    
    localizacao:{
        type: Sequelize.STRING,
        allowNull: false
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    freezeTableName: true,
    tableName: 'ala'
});

Ala.sync({force:false});
module.exports = Ala;
