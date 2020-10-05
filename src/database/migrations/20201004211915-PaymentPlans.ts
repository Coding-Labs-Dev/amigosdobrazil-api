import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface.removeColumn('PaymentPlans', 'reservationFee');
  },

  down: (
    queryInterface: QueryInterface,
    Sequelize: typeof DataTypes,
  ): Promise<void> => {
    return queryInterface.addColumn(
      'PaymentPlans',
      'reservationFee',
      Sequelize.DECIMAL(10, 4),
    );
  },
};
