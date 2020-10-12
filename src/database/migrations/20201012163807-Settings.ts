import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (
    queryInterface: QueryInterface,
    Sequelize: typeof DataTypes,
  ): Promise<void> => {
    await queryInterface.addColumn('Settings', 'pagSeguroToken', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('Settings', 'pagSeguroEmail', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('Settings', 'instagram', {
      type: Sequelize.STRING,
    });

    await queryInterface.addColumn('Settings', 'facebook', {
      type: Sequelize.STRING,
    });
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.removeColumn('Settings', 'pagSeguroToken');
    await queryInterface.removeColumn('Settings', 'pagSeguroEmail');
    await queryInterface.removeColumn('Settings', 'instagram');
    await queryInterface.removeColumn('Settings', 'facebook');
  },
};
