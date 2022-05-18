const { Sequelize } = require('sequelize');
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'zaq1',
    database: 'library',
};

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'mysql',
});

module.exports = sequelize;
