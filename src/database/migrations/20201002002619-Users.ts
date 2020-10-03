import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: (
    queryInterface: QueryInterface,
    Sequelize: typeof DataTypes,
  ): Promise<void> => {
    return queryInterface.addColumn('Users', 'surname', Sequelize.STRING);
  },
  down: (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface.removeColumn('Users', 'surname');
  },
};
