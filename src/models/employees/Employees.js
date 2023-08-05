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
    roolsID:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Employees.associate = (models) => {
    Employees.belongsToMany(models.EmployeeRole, {
      through: models.EmployeeRoleAssignment,
      foreignKey: "employee_id",
    });
  };

module.exports = Employees;
