const { DataTypes } = require('sequelize');
const db = require('../../../db.config');

const Book = db.define(
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
