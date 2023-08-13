const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const RoomsFratuer = sequelize.define("RoomsFratuer", {
    RoomsFratuer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    rooms_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    feature_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  return RoomsFratuer;
};
