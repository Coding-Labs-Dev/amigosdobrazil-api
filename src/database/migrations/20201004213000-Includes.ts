import { QueryInterface, DataTypes } from 'sequelize';

type Model = Array<{
  [key: string]: string;
}>;

module.exports = {
  up: async (
    queryInterface: QueryInterface,
    Sequelize: typeof DataTypes,
  ): Promise<void> => {
    const trips = (await queryInterface.select(null, 'Trips')) as Model;
    const ids = trips.map(({ id }) => id);
    await Promise.all(
      ids.map(async tripId => {
        const includesMM = (await queryInterface.select(null, 'TripInclude', {
          where: { tripId },
        })) as Model;
        const includesIds = includesMM.map(({ includeId }) => includeId);
        await queryInterface.bulkUpdate(
          'Includes',
          { tripId },
          { id: includesIds },
        );
      }),
    );
  },
  down: (queryInterface: QueryInterface): Promise<void> => {
    return new Promise(resolve => resolve());
  },
};
