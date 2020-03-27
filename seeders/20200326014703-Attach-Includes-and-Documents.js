'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const trips = await queryInterface.sequelize.query(
      `SELECT id from "Trips";`,
    );

    const documents = await queryInterface.sequelize.query(
      `SELECT id from "Documents";`,
    );

    const includes = await queryInterface.sequelize.query(
      `SELECT id from "Includes";`,
    );

    const tripsIds = trips[0];
    const documentsIds = documents[0];
    const includesIds = includes[0];

    return Promise.all(
      tripsIds.map(async ({ id: tripId }) => {
        const docsAssociations = documentsIds.map(({ id: documentId }) => ({
          tripId,
          documentId,
        }));
        const includeAssociations = includesIds.map(({ id: includeId }) => ({
          tripId,
          includeId,
        }));

        await queryInterface.bulkInsert('TripDocument', docsAssociations);
        await queryInterface.bulkInsert('TripInclude', includeAssociations);
      }),
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
