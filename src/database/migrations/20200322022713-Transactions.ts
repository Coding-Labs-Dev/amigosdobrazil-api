import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: (
    queryInterface: QueryInterface,
    Sequelize: typeof DataTypes,
  ): Promise<void> => {
    return queryInterface.createTable('Transactions', {
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
      clientId: {
        type: Sequelize.INTEGER,
        references: { model: 'Clients', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      transactionCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      paymentPlanId: {
        type: Sequelize.INTEGER,
        references: { model: 'PaymentPlans', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      paymentMethod: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      grossAmount: {
        type: Sequelize.DECIMAL(2),
        allowNull: false,
      },
      discountAmount: {
        type: Sequelize.DECIMAL(2),
        allowNull: false,
      },
      feeAmount: {
        type: Sequelize.DECIMAL(2),
        allowNull: false,
      },
      extraAmount: {
        type: Sequelize.DECIMAL(2),
        allowNull: false,
      },
      netAmount: {
        type: Sequelize.DECIMAL(2),
        allowNull: false,
      },
      escrowEndDate: {
        type: Sequelize.DATE,
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
    return queryInterface.dropTable('Transactions');
  },
};
