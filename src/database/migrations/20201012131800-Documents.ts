import { QueryInterface, DataTypes } from 'sequelize';

type Model = Array<{
  [key: string]: string;
}>;

module.exports = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    const trips = (await queryInterface.select(null, 'Trips')) as Model;
    const ids = trips.map(({ id }) => id);
    await Promise.all(
      ids.map(async tripId => {
        const documentsMM = (await queryInterface.select(null, 'TripDocument', {
          where: { tripId },
        })) as Model;
        const documentsIds = documentsMM.map(({ documentId }) => documentId);
        await queryInterface.bulkUpdate(
          'Documents',
          { tripId },
          { id: documentsIds },
        );
      }),
    );
  },
  down: (queryInterface: QueryInterface): Promise<void> => {
    return new Promise(resolve => resolve());
  },
};
