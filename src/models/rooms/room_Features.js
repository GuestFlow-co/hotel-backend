"use strict";

const room_features = (sequelize, DataTypes) =>
  sequelize.define("feature", {
    feature_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    feature_name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  });
module.exports = room_features;

// const roomFeaturesCollection = new collection(room_features);
// module.exports = roomFeaturesCollection;
