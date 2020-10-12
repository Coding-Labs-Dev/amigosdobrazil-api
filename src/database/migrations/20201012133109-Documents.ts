import { QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> => {
    return queryInterface.removeConstraint(
      'Documents',
      'Documents_description_key',
    );
  },
};
