
const Payments = (sequelize,DataTypes)=>sequelize.define('payments', {
  payments_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
 
  payment_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Payments;
