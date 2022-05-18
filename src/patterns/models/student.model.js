const { DataTypes } = require('sequelize');
const db = require('../../../db.config');

const Student = db.define(
    'student',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        pesel: {
            type: DataTypes.STRING(11),
            allowNull: false,
            unique: true,
            len: [11, 11],
        },
        name: {
            type: DataTypes.STRING(70),
            allowNull: false,
        },

        surname: {
            type: DataTypes.STRING(70),
            allowNull: false,
        },
    },
    {}
);

module.exports = Student;
