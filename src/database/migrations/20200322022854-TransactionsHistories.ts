import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: (
    queryInterface: QueryInterface,
    Sequelize: typeof DataTypes,
  ): Promise<void> => {
    return queryInterface.createTable('TransactionsHistories', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      transactionId: {
        type: Sequelize.INTEGER,
        references: { model: 'Transactions', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cancelationSource: {
        type: Sequelize.ENUM('INTERNAL', 'EXTERNAL'),
        allowNull: true,
      },
      lastEventDate: {
        type: Sequelize.DATE,
        allowNull: true,
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
    return queryInterface.dropTable('TransactionsHistories');
  },
};
