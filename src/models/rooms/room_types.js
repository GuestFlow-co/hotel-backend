"use strict";

const room_types = (sequelize, DataTypes) =>
  sequelize.define("room_types", {
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type_name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  });
module.exports = room_types;
