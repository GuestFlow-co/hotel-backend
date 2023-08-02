"use strict";
require('dotenv').config();
const { Sequelize, DataTypes } = require("sequelize");

const DataCollection = require("./collection");
const usersModel = require("./users");



// const DB_URL =
//   process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';

// let sequelizeOptions =
//   process.env.NODE_ENV === "production"
//     ? {
//         dialectOptions: {
//           ssl: {
//             require: true,
//             rejectUnauthorized: false,
//           },
//         },
//       }
//     : {};




// Define relationships

const sequelize = new Sequelize(DATABASE_URL);
const users = usersModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  users: new DataCollection(users),
};