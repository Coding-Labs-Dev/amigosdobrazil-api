import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

export interface SettingAttributes {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly street: string;
  readonly neigh: string;
  readonly city: string;
  readonly state: string;
  readonly zip: string;
  readonly mainPhone: string;
  readonly altPhone?: string;
  readonly maxInstallments: number;
  readonly maxNoInterestInstallments: number;
  readonly deleted: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

type SettingModel = Model & SettingAttributes;

type SettingStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): SettingModel;
} & {
  _defaults: { [key: string]: { [key: string]: object | string | boolean } };
};

const SettingAttributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  neigh: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zip: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mainPhone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  altPhone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  maxInstallments: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  maxNoInterestInstallments: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: { type: DataTypes.DATE, allowNull: false },
  updatedAt: { type: DataTypes.DATE, allowNull: false },
};

export default class Setting extends Model<SettingModel, SettingStatic> {
  readonly id: number;

  readonly name: string;

  readonly email: string;

  readonly street: string;

  readonly neigh: string;

  readonly city: string;

  readonly state: string;

  readonly zip: string;

  readonly mainPhone: string;

  readonly altPhone?: string;

  readonly maxInstallments: number;

  readonly maxNoInterestInstallments: number;

  readonly deleted: boolean;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}

export const factory = (sequelize: Sequelize): void =>
  Setting.init(SettingAttributes, { sequelize, tableName: 'Settings' });
