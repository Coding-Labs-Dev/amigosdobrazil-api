import {
  Sequelize,
  Model,
  ModelCtor,
  DataTypes,
  BuildOptions,
} from 'sequelize';

export interface UserAttributes {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly deleted: boolean;
  readonly createdAt: boolean;
  readonly upatedAt: boolean;
}

type UserModel = Model & UserAttributes;

type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
} & {
  _defaults: { [key: string]: { [key: string]: object | string | boolean } };
};

const UserAttributes = {
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
  password: {
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

export default class User extends Model<UserModel, UserStatic> {
  readonly id: number;

  readonly name: string;

  readonly email: string;

  readonly password: string;

  readonly deleted: boolean;

  readonly createdAt: boolean;

  readonly upatedAt: boolean;
}

export const factory = (sequelize: Sequelize): void =>
  User.init(UserAttributes, { sequelize, tableName: 'Users' });
