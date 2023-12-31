"use srtict";
const Employees = (sequelize, DataTypes) =>
  sequelize.define("Employee", {
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },

    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });


module.exports = Employees;
