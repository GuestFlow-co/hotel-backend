const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const employeeAssignment = sequelize.define("employeeAssignment", {
    employeeAssignment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,

    },
    rooms_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    employee_id:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    assigentDate:{
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW ,
      allowNull: true
    }

  });

  return employeeAssignment;
};
