const Sequelize = require('sequelize');
const connection = require('./database');
const Bilheteiro = require('./Bilheteiro');
const Bilheteria = require('./Bilheteria');

const Cuida = connection.define( 'cuida',{
    bilheteiroCPF:{
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    bilheteriaId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    }
},{
    freezeTableName: true,
    tableName: 'cuida'
})

Cuida.belongsTo(Bilheteiro, {foreignKey: 'bilheteiroCPF', targetKey: 'CPF', onDelete: 'CASCADE'})
Cuida.belongsTo(Bilheteria, {foreignKey: 'bilheteriaId', targetKey: 'id', onDelete: 'CASCADE'})

Cuida.sync({force:false})
module.exports = Cuida