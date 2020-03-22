import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: (
    queryInterface: QueryInterface,
    Sequelize: typeof DataTypes,
  ): Promise<void> => {
    return queryInterface.createTable('Trips', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      featured: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      subTitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      backgroundId: {
        type: Sequelize.INTEGER,
        references: { model: 'Files', key: 'id' },
        allowNull: false,
      },
      backgroundPosition: {
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
      titlePosition: {
        type: Sequelize.ENUM('top', 'center', 'bottom'),
        allowNull: false,
        defaultValue: 'center',
      },
      days: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      minSize: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      destinationsQty: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      departure: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      description: {
        type: Sequelize.JSON,
        allowNull: false,
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
    return queryInterface.dropTable('Trips');
  },
};
