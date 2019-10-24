'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Event extends Model{}
  Event.init({
    name: DataTypes.STRING,
    schedule: DataTypes.DATE,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    price: DataTypes.INTEGER,
    maxSeats: DataTypes.INTEGER,
    seats: DataTypes.INTEGER,
    image: DataTypes.STRING,
    venue: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {sequelize, modelName: 'Event'});
  Event.associate = function(models) {
    // associations can be defined here
    Event.belongsToMany(models.Customer, {through: 'CustomerEvent', foreignKey: 'EventId'})
  };
  return Event;
};