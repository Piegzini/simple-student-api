const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_BASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
    port: 5432,
    dialectOptions: {
        ssl: { require: true, rejectUnauthorized: false },
    },
});

// sequelize
//     .authenticate()
//     .then(() => console.log('Connection has been established successfully.'))
//     .catch((error) => console.error('Unable to connect to the database:', error));

module.exports = sequelize;
