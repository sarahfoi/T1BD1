const Sequelize = require('sequelize');
const connection = require('./database');

const HorarioAla = connection.define( 'horarioala',{
    cod:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    horario:{
        type: Sequelize.TIME,
        allowNull: false
    }
})

HorarioAla.sync({force:false})