import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: (
    queryInterface: QueryInterface,
    Sequelize: typeof DataTypes,
  ): Promise<void> => {
    return queryInterface.createTable('Heroes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      backgroundId: {
        type: Sequelize.INTEGER,
        references: { model: 'Files', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      position: {
        type: Sequelize.ENUM(
          'left top',
          'left center',
          'left bottom',
          'right top',
          'right center',
          'right bottom',
          'center top',
          'center center',
          'center bottom',
        ),
        allowNull: false,
        defaultValue: 'center center',
      },
      opacity: {
        type: Sequelize.DECIMAL(1),
        allowNull: false,
        defaultValue: 1,
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface.dropTable('Heroes');
  },
};
