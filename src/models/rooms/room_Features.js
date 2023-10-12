"use strict";

const room_features = (sequelize, DataTypes) =>
  sequelize.define("feature", {
    feature_id: {
      type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    feature_name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  });
module.exports = room_features;