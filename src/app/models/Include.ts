import {
  Sequelize,
  Model,
  ModelCtor,
  DataTypes,
  BuildOptions,
} from 'sequelize';

export interface IncludeAttributes {
  readonly id: number;
  readonly description: string;
  readonly deleted: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

type IncludeModel = Model & IncludeAttributes;

type IncludeStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IncludeModel;
} & {
  _defaults: { [key: string]: { [key: string]: object | string | boolean } };
};

const IncludeAttributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: { type: DataTypes.DATE, allowNull: false },
  updatedAt: { type: DataTypes.DATE, allowNull: false },
};

export default class Include extends Model<IncludeModel, IncludeStatic> {
  readonly id: number;

  readonly description: string;

  readonly deleted: boolean;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}

export const factory = (sequelize: Sequelize): void =>
  Include.init(IncludeAttributes, { sequelize, tableName: 'Includes' });

export const associate = (models: {
  [key: string]: ModelCtor<Model>;
}): void => {
  Include.belongsToMany(models.Trip, {
    through: 'TripInclude',
    foreignKey: 'includeId',
    timestamps: false,
    as: 'trips',
  });
};
