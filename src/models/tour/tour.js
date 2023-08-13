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
      tour_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tourId:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    people_in_tour: {
      type: DataTypes.JSON, // or DataTypes.STRING if you prefer
      defaultValue: '[]',   // Initialize with an empty JSON array
      get() {
        const rawValue = this.getDataValue('people_in_tour');
        return JSON.parse(rawValue || '[]');
      },
      set(value) {
        this.setDataValue('people_in_tour', JSON.stringify(value));
      },
    },
     max_amount:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    number_of_booking_people:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    availableSeat:{
      type: DataTypes.INTEGER,
      allowNull: true,
    }
    //   ,
    // guid_id:{
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    // }
  });

module.exports =  tour ;

