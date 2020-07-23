import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

export interface ClientAttributes {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly socialMedia: object;
  readonly mainPhone: string;
  readonly altPhone?: string;
  readonly street: string;
  readonly neigh: string;
  readonly city: string;
  readonly state: string;
  readonly zip: string;
  readonly notes?: string;
  readonly deleted: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

type ClientModel = Model & ClientAttributes;

type ClientStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ClientModel;
} & {
  _defaults: { [key: string]: { [key: string]: object | string | boolean } };
};

const ClientAttributes = {
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
    unique: true,
  },
  socialMedia: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: {},
  },
  mainPhone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  altPhone: {
    type: DataTypes.STRING,
    allowNull: true,
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
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: { type: DataTypes.DATE, allowNull: false },
  updatedAt: { type: DataTypes.DATE, allowNull: false },
};

export default class Client extends Model<ClientModel, ClientStatic> {
  readonly id: number;

  readonly name: string;

  readonly email: string;

  readonly socialMedia: object;

  readonly mainPhone: string;

  readonly altPhone?: string;

  readonly street: string;

  readonly neigh: string;

  readonly city: string;

  readonly state: string;

  readonly zip: string;

  readonly notes?: string;

  readonly deleted: boolean;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}

export const factory = (sequelize: Sequelize): void =>
  Client.init(ClientAttributes, { sequelize, tableName: 'Clients' });
