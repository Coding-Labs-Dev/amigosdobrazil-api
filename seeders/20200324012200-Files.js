'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Files',
      [
        {
          file: '0788e913-1f2a-42e4-8d56-9eee6c1de0d7.jpg',
          originalName: 'cape-town.jpg',
          type: 'image',
          subType: 'jpeg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          file: 'd6990a58-6582-48f4-a3e8-6991fe9de52f.jpg',
          originalName: 'cape-town.jpg',
          type: 'image',
          subType: 'jpeg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          file: 'e7204a4f-1b6f-4d4e-8d81-cae5b3e123b5.jpg',
          originalName: 'china.jpg',
          type: 'image',
          subType: 'jpeg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          file: 'c44d917d-adab-4210-b8f8-6a1003cb846f.jpg',
          originalName: 'china.jpg',
          type: 'image',
          subType: 'jpeg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          file: 'c3009a6e-18cc-44e2-b6e1-7baf3de4125e.jpg',
          originalName: 'india.jpg',
          type: 'image',
          subType: 'jpeg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          file: '4f61bb97-c6dc-4245-aa95-9fdd54c468f8.jpg',
          originalName: 'india.jpg',
          type: 'image',
          subType: 'jpeg',
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
