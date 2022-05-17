const { Sequelize, DataTypes } = require('sequelize');
const { database, user, password, host } = require('../../../db.config');

const sequelize = new Sequelize(database, user, password, {
    host,
    dialect: 'mysql',
});

const Book = sequelize.define(
    'book',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(70),
            allowNull: false,
            required: true,
        },
    },
    {}
);

module.exports = Book;
