'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Documents',
      [
        {
          description:
            'Passaporte com no mínimo 3 meses de validade na data da viagem',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: '4 fotos 3x4',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
