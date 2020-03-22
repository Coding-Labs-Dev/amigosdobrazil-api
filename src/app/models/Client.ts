import {
  Sequelize,
  Model,
  ModelCtor,
  DataTypes,
  BuildOptions,
} from 'sequelize';

export interface ClientAttributes {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly deleted: boolean;
  readonly createdAt: boolean;
  readonly upatedAt: boolean;
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

  readonly deleted: boolean;

  readonly createdAt: boolean;

  readonly upatedAt: boolean;
}

export const factory = (sequelize: Sequelize): void =>
  Client.init(ClientAttributes, { sequelize, tableName: 'Clients' });
