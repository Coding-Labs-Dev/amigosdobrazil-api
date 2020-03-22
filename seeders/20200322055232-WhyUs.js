'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'WhyUs',
      [
        {
          title: 'Transporte Aéreo',
          text:
            'Os nossos pacotes já incluem a passagem aérea e as taxas de embarque, gerando inclusive milhas aéreas!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Transporte Terrestre',
          text:
            'Assim como o transporte aéreo, todos os translados entre os aeroportos, hotéis e passeios, estão inclusos!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Hospedagem',
          text:
            'Os nossos roteiros possuem hospedagem em hoteis 4 e 5 estrelas e com café-da-manhã incluso!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Passeios Exclusivos',
          text:
            'Passeios exlcusivos inclusos conforme o roteiro de viagem, todos acompanhados de guias locais!',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('WhyUs', null, {});
  },
};
