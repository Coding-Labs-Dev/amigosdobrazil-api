import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (
    queryInterface: QueryInterface,
    Sequelize: typeof DataTypes,
  ): Promise<void> => {
    await queryInterface.changeColumn('Trips', 'backgroundId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('Trips', 'bannerId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: async (
    queryInterface: QueryInterface,
    Sequelize: typeof DataTypes,
  ): Promise<void> => {
    await queryInterface.changeColumn('Trips', 'backgroundId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.changeColumn('Trips', 'bannerId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
