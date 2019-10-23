'use strict';
module.exports = (sequelize, DataTypes) => {
  const CustomerEvent = sequelize.define('CustomerEvent', {
    CustomerId: DataTypes.INTEGER,
    EventId: DataTypes.INTEGER
  }, {});
  CustomerEvent.associate = function(models) {
    // associations can be defined here
  };
  return CustomerEvent;
};