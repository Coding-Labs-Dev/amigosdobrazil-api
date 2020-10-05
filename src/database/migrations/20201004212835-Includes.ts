import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: (
    queryInterface: QueryInterface,
    Sequelize: typeof DataTypes,
  ): Promise<void> => {
    return queryInterface.addColumn('Includes', 'tripId', {
      type: Sequelize.INTEGER,
      references: { model: 'Trips', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },
  down: (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface.removeColumn('Includes', 'tripId');
  },
};
