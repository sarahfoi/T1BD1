const Sequelize = require('sequelize');
const connection = require('./database');
const Bilheteria = require('./Bilheteria')

const HorarioBilheteria = connection.define( 'horarioBilheteria',{
    bilheteriaId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    horarioInicio:{
        type: Sequelize.TIME,
        primaryKey: true,
        allowNull: false
    },
    horarioFinal:{
        type: Sequelize.TIME,
        primaryKey: true,
        allowNull: false
    }
},{
    freezeTableName: true,
    tableName: 'horarioBilheteria'
})

HorarioBilheteria.belongsTo(Bilheteria, {foreignKey: 'bilheteriaId', targetKey: 'id', onDelete: 'CASCADE'})

HorarioBilheteria.sync({force:false})
module.exports = HorarioBilheteria