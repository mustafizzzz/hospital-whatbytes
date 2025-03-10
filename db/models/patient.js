'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

const sequelize = require('../../config/database');
const users = require('./user');
const doctors = require('./doctor');
const patientdoctors = require('./patientdoctors');


const patients = sequelize.define(
  "patients",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,

    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,

    },
  },
  {
    freezeTableName: true,
  }
);

// Define associations
patients.belongsTo(users, {
  foreignKey: "userId",
});
users.hasMany(patients, {
  foreignKey: "userId",
});




module.exports = patients;