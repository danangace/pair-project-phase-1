'use strict';

const fs = require('fs');
let customers = JSON.parse(fs.readFileSync('./customer.json', 'utf8'));

for(let i=0; i<customers.length; i++) {
  customers[i].createdAt = new Date();
  customers[i].updatedAt = new Date();
}

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Customers', customers, {});
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Customers', null, {});
  }
};