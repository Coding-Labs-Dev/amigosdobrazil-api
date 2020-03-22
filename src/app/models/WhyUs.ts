import {
  Sequelize,
  Model,
  ModelCtor,
  DataTypes,
  BuildOptions,
} from 'sequelize';

export interface WhyUsAttributes {
  readonly id: number;
  readonly title: string;
  readonly text: string;
  readonly deleted: boolean;
  readonly createdAt: Date;
  readonly upatedAt: Date;
}

type WhyUsModel = Model & WhyUsAttributes;

type WhyUsStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): WhyUsModel;
} & {
  _defaults: { [key: string]: { [key: string]: object | string | boolean } };
};

const WhyUsAttributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.STRING,
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

export default class WhyUs extends Model<WhyUsModel, WhyUsStatic> {
  readonly id: number;

  readonly title: string;

  readonly text: string;

  readonly deleted: boolean;

  readonly createdAt: Date;

  readonly upatedAt: Date;
}

export const factory = (sequelize: Sequelize): void =>
  WhyUs.init(WhyUsAttributes, { sequelize, tableName: 'WhyUs' });
