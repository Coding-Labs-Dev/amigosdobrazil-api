cat > ./src/app/models/$1.ts << EOF
import {
  Sequelize,
  Model,
  ModelCtor,
  DataTypes,
  BuildOptions,
} from 'sequelize';

export interface $1Attributes {
  readonly id: number;

  readonly deleted: boolean;
  readonly createdAt: boolean;
  readonly upatedAt: boolean;
}

type $1Model = Model & $1Attributes;

type $1Static = typeof Model & {
  new (values?: object, options?: BuildOptions): $1Model;
} & {
  _defaults: { [key: string]: { [key: string]: object | string | boolean } };
};

const $1Attributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: { type: DataTypes.DATE, allowNull: false },
  updatedAt: { type: DataTypes.DATE, allowNull: false },
};

export default class $1 extends Model<$1Model, $1Static> {
  readonly id: number;

  readonly deleted: boolean;

  readonly createdAt: boolean;

  readonly upatedAt: boolean;
}

export const factory = (sequelize: Sequelize): void =>
  $1.init($1Attributes, { sequelize, tableName: '$1s' });

export const associate = (models: {
  [key: string]: ModelCtor<Model>;
}): void => {
  // $1.belongsToMany(models.Email, {
  //   through: 'UserEmails',
  //   foreignKey: '$1Id',
  //   timestamps: false,
  //   as: 'emails',
  // });
  // $1.hasMany(models.Event, {
  //   foreignKey: '$1Id',
  //   as: 'events',
  // });
};
EOF