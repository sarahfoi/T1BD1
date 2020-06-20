const Sequelize = require('sequelize');
const connection = require('./database');

const Ingresso = connection.define( 'ingressos',{
    num:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    horario:{
        type: Sequelize.TIME,
        allowNull: false
    },
    data:{
        type: Sequelize.DATE,
        allowNull: false
    },
    numBilheteria:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
},{
    freezeTableName: true,
    tableName: 'ingresso'
})

Ingresso.sync({force:false})
module.exports = Ingresso