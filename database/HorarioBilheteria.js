const Sequelize = require('sequelize');
const connection = require('./database');
const Bilheteria = require('./Bilheteria')

const HorarioBilheteria = connection.define( 'horarioBilheteria',{
    
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

HorarioBilheteria.belongsTo(Bilheteria, {foreignKey: {
    allowNull: false}, onDelete: 'CASCADE'})

HorarioBilheteria.sync({force:false})
module.exports = HorarioBilheteria