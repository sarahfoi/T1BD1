const Sequelize = require('sequelize');
const connection = new Sequelize('bdzoo', 'root','12345',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;

