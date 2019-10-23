'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    gender: DataTypes.STRING,
    login_status: DataTypes.BOOLEAN
  }, {});
  Customer.associate = function(models) {
    // associations can be defined here
    Customer.belongsToMany(models.Event, {through: 'CustomerEvent', foreignKey: 'CustomerId' })
  };
  return Customer;
};