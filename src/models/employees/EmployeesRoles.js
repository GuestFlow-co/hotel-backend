const employeeRole = (sequelize, DataTypes) =>
  sequelize.define("employeeRole", {
    employeeRole_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
module.exports = employeeRole;
