"use strict";

const guide = (sequelize, DataTypes) =>
  sequelize.define("guide", {
    guide_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phoneNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
    avalibility:{
        type:DataTypes.BOOLEAN,
        defaultValue: true
     },
     guide_price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
     
  });
  
    // guide.associate = (models) => {
    //   guide.belongsToMany(models.EmployeeRole, {
    //     through: models.EmployeeRoleAssignment,
    //     foreignKey: "employee_id",
    //   });}


module.exports =  guide ;
