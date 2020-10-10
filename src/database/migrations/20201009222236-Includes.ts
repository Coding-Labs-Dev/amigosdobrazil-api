import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: (
    queryInterface: QueryInterface,
    Sequelize: typeof DataTypes,
  ): Promise<void> => {
    return queryInterface.addColumn('Includes', 'included', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    });
  },
  down: (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface.removeColumn('Includes', 'included');
  },
};
