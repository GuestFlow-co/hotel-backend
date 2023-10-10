"use strict";

const tour = (sequelize, DataTypes) =>
  sequelize.define("Tour", {
    Tour_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'tour_id',
      unique: true,
    },
    description: {
      type: DataTypes.STRING(1012), 
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
    Seat_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    guideId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    people_in_tour: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: [],
    },
    max_capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    availableSeat: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tour_customer: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      defaultValue: [],
    },
    photoUrl: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    coverPhoto: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING(1012), // Increase the maximum length to 1012 characters
    },
    Title: {
      type: DataTypes.STRING(1012), // Increase the maximum length to 1012 characters
    },
   
    Rating: {
      type: DataTypes.INTEGER,
    },
    TourPlan: {
      type: DataTypes.JSON,
      defaultValue: {},
      get() {
        return JSON.parse(this.getDataValue('TourPlan'));
      },
      set(value) {
        this.setDataValue('TourPlan', JSON.stringify(value));
      },
    },
  });

module.exports = tour;
