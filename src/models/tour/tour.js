"use strict";

const tour = (sequelize, DataTypes) =>
  sequelize.define("tour", {
    Tour_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      tour_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    guid_id:{
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  });

module.exports =  tour ;
