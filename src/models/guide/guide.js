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
      tourId:{
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  });


module.exports =  guide ;
