'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class CustomerEvent extends Model{}
  CustomerEvent.init({
    CustomerId: DataTypes.INTEGER,
    EventId: DataTypes.INTEGER
  }, {sequelize, modelName: "CustomerEvent"});
  CustomerEvent.associate = function(models) {
    // associations can be defined here
  };
  return CustomerEvent;
};