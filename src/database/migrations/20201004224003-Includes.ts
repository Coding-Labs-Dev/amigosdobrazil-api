import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface.removeConstraint(
      'Includes',
      'Includes_description_key',
    );
  },
};
