const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
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
