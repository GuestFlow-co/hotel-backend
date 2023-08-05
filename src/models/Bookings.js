"use strict";

const Bookings = (sequelize, DataTypes) =>
  sequelize.define("bookings", {
    bookings_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    
    // customer_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'Customers',
    //     key: 'customer_id',
    //   },
    // },
    paymentID:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    theRoomID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // references: {
      //   model: "Rooms",
      //   key: "room_number",
      // },
    },
    check_in_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    check_out_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    total_amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    payment_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

module.exports = Bookings;
