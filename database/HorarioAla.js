const Sequelize = require('sequelize');
const connection = require('./database');

const HorarioAla = connection.define( 'horarioAla',{
    cod:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    horario:{
        type: Sequelize.TIME,
        allowNull: false
    }
},{
    freezeTableName: true,
    tableName: 'horarioAla'
})

HorarioAla.sync({force:false})
module.exports = HorarioAla