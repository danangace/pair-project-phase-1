'use strict';

const fs = require('fs');
let events = JSON.parse(fs.readFileSync('./event.json', 'utf8'));

for(let i=0; i<events.length; i++) {
  events[i].createdAt = new Date();
  events[i].updatedAt = new Date();
  events[i].seats = 0
}

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Events', events, {});
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Events', null, {});
  }
};