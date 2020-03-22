import {
  Sequelize,
  Model,
  ModelCtor,
  DataTypes,
  BuildOptions,
} from 'sequelize';

export interface IncludesAttributes {
  readonly id: number;
  readonly description: string;
  readonly deleted: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

type IncludesModel = Model & IncludesAttributes;

type IncludesStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IncludesModel;
} & {
  _defaults: { [key: string]: { [key: string]: object | string | boolean } };
};

const IncludesAttributes = {
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

export default class Includes extends Model<IncludesModel, IncludesStatic> {
  readonly id: number;

  readonly description: string;

  readonly deleted: boolean;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}

export const factory = (sequelize: Sequelize): void =>
  Includes.init(IncludesAttributes, { sequelize, tableName: 'Includess' });

export const associate = (models: {
  [key: string]: ModelCtor<Model>;
}): void => {
  Includes.belongsToMany(models.Trip, {
    through: 'TripInclude',
    foreignKey: 'includeId',
    timestamps: false,
    as: 'trips',
  });
};
