const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const RoomTypeFeature = sequelize.define("RoomTypeFeature", {
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    feature_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  });

  return RoomTypeFeature;
};
