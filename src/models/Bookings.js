'use strict';


const Bookings = (sequelize,DataTypes)=>sequelize.define('bookings', {
  booking_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Customers',
      key: 'customer_id',
    },
  },
  room_number: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Rooms',
      key: 'room_number',
    },
  },
  check_in_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  check_out_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  total_amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  payment_status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Bookings;


