const Sequelize = require('sequelize');
const connection = require('./database');
const Ala = require('./Ala')

const HorarioAla = connection.define( 'horarioAla',{
    alaId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    horarioInicio:{
        type: Sequelize.TIME,
        allowNull: false,
        primaryKey: true
    },
    horarioFinal:{
        type: Sequelize.TIME,
        allowNull: false,
        primaryKey: true
    }
},{
    freezeTableName: true,
    tableName: 'horarioAla'
})
HorarioAla.belongsTo(Ala, {foreignKey: 'alaId', targetKey: 'id', onDelete: 'CASCADE'});

HorarioAla.sync({force:false})
module.exports = HorarioAla