const Sequelize = require('sequelize');
const connection = require('./database');
const Bilheteiro = require('./Bilheteiro');
const Bilheteria = require('./Bilheteria');

const Cuida = connection.define( 'cuida',{
    
},{
    freezeTableName: true,
    tableName: 'cuida'
})

Cuida.belongsTo(Bilheteiro, {primaryKey: true, foreignKey: {
    allowNull: false}, onDelete: 'CASCADE'})
Cuida.belongsTo(Bilheteria, {primaryKey: true, foreignKey: {
    allowNull: false}, onDelete: 'CASCADE'})

Cuida.sync({force:false})
module.exports = Cuida