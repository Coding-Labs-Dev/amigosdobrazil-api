import {
  Sequelize,
  Model,
  ModelCtor,
  DataTypes,
  BuildOptions,
} from 'sequelize';

import bcrypt from 'bcryptjs';

export interface UserAttributes {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly passwordHash: string;
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
    type: DataTypes.VIRTUAL,
  },
  passwordHash: {
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

  public passwordHash: string;

  readonly deleted: boolean;

  readonly createdAt: boolean;

  readonly upatedAt: boolean;

  async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash);
  }
}

export const factory = (sequelize: Sequelize): void => {
  User.init(UserAttributes, {
    sequelize,
    tableName: 'Users',
  });

  User.beforeValidate((user: User): void => {
    if (user.password) {
      // eslint-disable-next-line no-param-reassign
      user.passwordHash = bcrypt.hashSync(user.password, 8);
    }
  });
};
