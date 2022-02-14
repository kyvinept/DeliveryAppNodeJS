const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    // process.env.DB_NAME,
    "authorize",
    // process.env.DB_USER,
    "postgres",
    // process.env.DB_PASSWORD,
    "Kyvinept99",
    {
        dialect: 'postgres',
        host: "localhost", //process.env.DB_HOST,
        port: 5432 //process.env.DB_PORT
    }
);

export default sequelize;