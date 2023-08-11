"use strict";
const Services = (sequelize, DataTypes) =>
  sequelize.define("service", {
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    serviceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

module.exports = Services;
