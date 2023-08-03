const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const EmployeeRoleAssignment = sequelize.define("EmployeeRoleAssignment", {
    assignment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return EmployeeRoleAssignment;
};
