var Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'heroku_08a6962b9fef948', //database
    'b5f115ad770aaf', // user
    '5a8daac0', //password
    {
        host: 'us-cdbr-east-02.cleardb.com',
        dialect: 'mysql'
    }
);

module.exports = sequelize;