const Sequelize = require('sequelize');
const connection = require('./database');
const Ala = require('./Ala');

const Especie = connection.define( 'especie',{
    
    nomeCientifico:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    nomePopular:{
        type: Sequelize.STRING,
        allowNull: false
    },
    estado:{
        type: Sequelize.STRING,
        allowNull: false
    },
    alimentacao:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    freezeTableName: true,
    tableName: 'especie'
})

Especie.belongsTo(Ala, {foreignKey: {
    allowNull: false}, onDelete: 'CASCADE'})

Especie.sync({force:false})
module.exports = Especie
