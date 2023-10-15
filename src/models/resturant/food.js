'use srtict'

const Food = (sequelize, DataTypes) => sequelize.define('Food', {
  Food_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    field: 'Food_id'
  },
  foodType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  foodName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  foodPrice: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  foodStatus: {
    type: DataTypes.STRING,
    defaultValue: "Available"
  },
  photoUrl: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  coverPhoto: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  }

})
module.exports = Food

