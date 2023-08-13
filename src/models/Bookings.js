"use strict";

const Booking = (sequelize, DataTypes) =>
  sequelize.define("booking", {
    booking_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    paymentID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    theRoomID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    check_in_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    check_out_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    bookingCost: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    payment_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    } ,
    guide_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tourId:{
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  number_of_seats_inTour:{
    type: DataTypes.INTEGER,
    allowNull: true,
  }
  });

module.exports = Booking;
