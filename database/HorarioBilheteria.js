const Sequelize = require('sequelize');
const connection = require('./database');

const HorarioBilheteria = connection.define( 'horarioBilheteria',{
    cod:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    horarioInicio:{
        type: Sequelize.TIME,
        allowNull: false
    },
    horarioFinal:{
        type: Sequelize.TIME,
        allowNull: false
    }
},{
    freezeTableName: true,
    tableName: 'horarioBilheteria'
})

HorarioBilheteria.sync({force:false})
module.exports = HorarioBilheteria