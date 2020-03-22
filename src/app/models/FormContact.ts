import {
  Sequelize,
  Model,
  ModelCtor,
  DataTypes,
  BuildOptions,
} from 'sequelize';

export interface FormContactAttributes {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
  readonly readed: boolean;
  readonly deleted: boolean;
  readonly createdAt: Date;
  readonly upatedAt: Date;
}

type FormContactModel = Model & FormContactAttributes;

type FormContactStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): FormContactModel;
} & {
  _defaults: { [key: string]: { [key: string]: object | string | boolean } };
};

const FormContactAttributes = {
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
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  readed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: { type: DataTypes.DATE, allowNull: false },
  updatedAt: { type: DataTypes.DATE, allowNull: false },
};

export default class FormContact extends Model<
  FormContactModel,
  FormContactStatic
> {
  readonly id: number;

  readonly name: string;

  readonly email: string;

  readonly subject: string;

  readonly message: string;

  readonly readed: boolean;

  readonly deleted: boolean;

  readonly createdAt: Date;

  readonly upatedAt: Date;
}

export const factory = (sequelize: Sequelize): void =>
  FormContact.init(FormContactAttributes, {
    sequelize,
    tableName: 'FormContacts',
  });
