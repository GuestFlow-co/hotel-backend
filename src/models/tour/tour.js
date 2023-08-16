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
      Seat_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      guideId:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    people_in_tour: {
      type: DataTypes.ARRAY(DataTypes.INTEGER), 
      defaultValue: [],
      
      // type: DataTypes.JSON, // or DataTypes.STRING if you prefer
      // defaultValue: '[]',   // Initialize with an empty JSON array
      // get() {
      //   const rawValue = this.getDataValue('people_in_tour');
      //   return JSON.parse(rawValue || '[]');
      // },
      // set(value) {
      //   this.setDataValue('people_in_tour', JSON.stringify(value));
      // },
    },
     max_capacity:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    availableSeat:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tour_customer: {
      type: DataTypes.ARRAY(DataTypes.JSON), 
      defaultValue: [],
  
      
    //   type: DataTypes.JSON, // or DataTypes.STRING if you prefer
    //   defaultValue: '[]',   // Initialize with an empty JSON array
    //   get() {
    //     const rawValue = this.getDataValue('tour_customer');
    //     return JSON.parse(rawValue || '[]');
    //   },
    //   set(value) {
    //     this.setDataValue('tour_customer', JSON.stringify(value));
    //   },
    },
  });

module.exports =  tour ;

