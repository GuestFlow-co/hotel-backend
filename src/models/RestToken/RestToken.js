// models/resetToken.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
const ResetToken = sequelize.define('ResetToken', {
  // ResetToken model fields
  userID:{
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});
return ResetToken;

}