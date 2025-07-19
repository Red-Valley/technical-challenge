'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const statuses = [
      { id: uuidv4(), name: 'Scheduled', order: 1 },
      { id: uuidv4(), name: 'Checked-In', order: 2 },
      { id: uuidv4(), name: 'In Consultation', order: 3 },
      { id: uuidv4(), name: 'Cancelled', order: 4 },
      { id: uuidv4(), name: 'No-Show', order: 5 }
    ];

    await queryInterface.bulkInsert('Statuses', statuses.map(status => ({
      ...status,
      parent_id: null,
      createdAt: new Date(),
      updatedAt: new Date()
    })), {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Statuses', {
      name: ['Scheduled', 'Checked-In', 'In Consultation', 'Cancelled', 'No-Show']
    }, {});
  }
};
