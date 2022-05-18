const { DataTypes } = require('sequelize');
const db = require('../../../db.config');

const Borrowing = db.define(
    'borrowing',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            required: true,
        },

        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            required: true,
        },
    },
    {}
);

module.exports = Borrowing;
