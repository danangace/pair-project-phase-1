'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Customer extends Model {}
  Customer.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: {
        args: [true],
        msg: 'Email sudah ada'
      },
      validate: {
          isEmail: {
            args: [true],
            msg: 'Format salah'
          }
      }
    },
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    gender: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, { hooks: {
    beforeCreate: (user) => {
        const saltRound = 10;
      const salt = bcrypt.genSaltSync(saltRound);
      user.password = bcrypt.hashSync(user.password, salt);
    }
  },sequelize});
  Customer.associate = function(models) {
    // associations can be defined here
    Customer.belongsToMany(models.Event, {through: 'CustomerEvent', foreignKey: 'CustomerId' })
  };
  return Customer;
};