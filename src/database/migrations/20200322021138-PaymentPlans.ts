import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: (
    queryInterface: QueryInterface,
    Sequelize: typeof DataTypes,
  ): Promise<void> => {
    return queryInterface.createTable('PaymentPlans', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      tripId: {
        type: Sequelize.INTEGER,
        references: { model: 'Trips', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      usd: {
        type: Sequelize.DECIMAL(10, 4),
        allowNull: false,
      },
      brl: {
        type: Sequelize.DECIMAL(10, 4),
        allowNull: false,
      },
      downPayment: {
        type: Sequelize.DECIMAL(10, 4),
        allowNull: false,
      },
      installmentsQty: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      installmentsValue: {
        type: Sequelize.DECIMAL(10, 4),
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
    return queryInterface.dropTable('PaymentPlans');
  },
};
