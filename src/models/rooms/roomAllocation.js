"use srtict";
const roomAllocation = (sequelize, DataTypes) =>
  sequelize.define("AllRoomAllocation", {
    allocationId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    room_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    check_in_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    check_out_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
module.exports = roomAllocation;
