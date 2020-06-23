const Sequelize = require('sequelize');
const connection = require('./database');
const Bilheteria = require('./Bilheteria')

const Ingresso = connection.define( 'ingressos',{

    preco:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
},{
    freezeTableName: true,
    tableName: 'ingresso'
})

Ingresso.belongsTo(Bilheteria, {foreignKey: {
    allowNull: false}, onDelete: 'CASCADE'})

Ingresso.sync({force:false})
module.exports = Ingresso