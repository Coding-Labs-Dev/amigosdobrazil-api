'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Settings',
      [
        {
          name: 'Amigos do Brazil',
          email: 'contato@amigosdobrazil.com.br',
          street: 'Avenida Liberdade, 21, Sala 1307',
          neigh: 'Bairro Liberdade',
          city: 'São Paulo',
          state: 'SP',
          zip: '01503-000',
          mainPhone: '(11) 5573-6999',
          altPhone: '(11) 98111-9180',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Settings', null, {});
  },
};
