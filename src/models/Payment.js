
const Payments = (sequelize,DataTypes)=>sequelize.define('payment', {
  payment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
 
   payment_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW ,
    allowNull: true
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status:{
    type: DataTypes.STRING,
    defaultValue: 'pending',
    allowNull: true,
  }
});

module.exports = Payments;
