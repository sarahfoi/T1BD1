const Sequelize = require('sequelize');
const connection = require('./database');

const HorarioBilheteria = connection.define( 'horariobilheteria',{
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
})

HorarioBilheteria.sync({force:false})