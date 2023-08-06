// models/resetToken.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
const ResetToken = sequelize.define('ResetToken', {
  // ResetToken model fields
  // user_id: {
  //   type: DataTypes.INTEGER, // Adjust the data type if necessary
  //   allowNull: false,
  //   references: {
  //     model: 'users', // Make sure this matches the actual table name
  //     key: 'id',
  //   }},
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