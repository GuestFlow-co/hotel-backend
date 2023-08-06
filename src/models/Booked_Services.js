const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const BookedService = sequelize.define("BookedService", {
    BookedService_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookings_id:{
      type: DataTypes.INTEGER,
      allowNull: true,
    }

  });

  return BookedService;
};
