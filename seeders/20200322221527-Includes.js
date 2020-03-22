'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Includes',
      [
        {
          description: 'Guia para assistência 24 horas',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description:
            'Guias locais: Israelense e Palestino em português durante toda a viagem',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description:
            'Veículo e motorista local exclusivo para o grupo, desde o transfer de chegada até a saída',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: 'Gorjetas para guias e motoristas locais',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: 'Tickes de entrada para todas as visitas da viagem',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description:
            'Kit de Viagem Insight (porta vouchers, necessaire e etiquetas de bagagem)',
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
