cat > ./src/database/migrations/$(date +"%Y%m%d%H%M%S")-$1.ts << EOF
import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: (
    queryInterface: QueryInterface,
    Sequelize: typeof DataTypes,
  ): Promise<void> => {
    return queryInterface.createTable('$1', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
    return queryInterface.dropTable('$1');
  },
};
EOF