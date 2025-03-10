const { Sequelize } = require('sequelize');

// const env = process.env.NODE_ENV | 'development';
// const config = require('./config.js')

require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";
const sequelize = isProduction
  ? new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Needed for Render PostgreSQL SSL
      },
    },
    logging: false,
  })
  : new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "postgres",
      logging: false,
    }
  );

module.exports = sequelize;