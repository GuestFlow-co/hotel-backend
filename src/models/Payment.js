const Payments = (sequelize, DataTypes) =>
  sequelize.define("payment", {
    payment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    payment_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    current_payment:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    previous_payments: {
      type: DataTypes.ARRAY(DataTypes.JSON), 
      defaultValue: [],
      
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
      allowNull: true,
    },
  });

module.exports = Payments;
