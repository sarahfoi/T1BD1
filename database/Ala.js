const Sequelize = require('sequelize');
const connection = require('./database');

const Ala = connection.define( 'ala',{
    cod:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
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