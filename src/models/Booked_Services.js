const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const BookedService = sequelize.define("BookedService", {
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  });

  return BookedService;
};
