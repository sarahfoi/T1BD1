const Sequelize = require('sequelize');
const connection = require('./database');
const Ala = require('./Ala')

const HorarioAla = connection.define( 'horarioAla',{
    
    horario:{
        type: Sequelize.TIME,
        allowNull: false
    }
},{
    freezeTableName: true,
    tableName: 'horarioAla'
})
HorarioAla.belongsTo(Ala);

HorarioAla.sync({force:false})
module.exports = HorarioAla