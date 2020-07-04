var Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'evaluaciongap', //database
    'root', // user
    '', //password
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = sequelize;