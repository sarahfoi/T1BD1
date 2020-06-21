const Sequelize = require('sequelize');
const connection = require('./database');

const Usuario = connection.define( 'usuario',{
    id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true
    },
    cpf:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    senha:{
        type: Sequelize.STRING,
        allowNull: false
    }
},{
    freezeTableName: true,
    tableName: 'usuario'
});

Usuario.sync({force:false});
module.exports = Usuario;


