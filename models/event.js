'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    schedule: DataTypes.DATE,
    status: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    venue: DataTypes.STRING
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
    Event.belongsToMany(models.Customer, {through: 'CustomerEvent', foreignKey: 'EventId'})
  };
  return Event;
};