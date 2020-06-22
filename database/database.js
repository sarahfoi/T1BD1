const Sequelize = require('sequelize');
const connection = new Sequelize({
    dialect: 'sqlite',
    storage: 'public/data/bdzoo.sqlite'
});

module.exports = connection;

