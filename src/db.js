const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log(process.env.DATABASE_HOST);
const sequelize = new Sequelize(process.env.DATABASE_BASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
});

module.exports = sequelize;
