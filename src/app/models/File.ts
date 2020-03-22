import {
  Sequelize,
  Model,
  ModelCtor,
  DataTypes,
  BuildOptions,
} from 'sequelize';

export interface FileAttributes {
  readonly id: number;
  readonly userId: number;
  readonly file: string;
  readonly originalName: string;
  readonly type: string;
  readonly subType: string;

  readonly deleted: boolean;
  readonly createdAt: Date;
  readonly upatedAt: Date;
}

type FileModel = Model & FileAttributes;

type FileStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): FileModel;
} & {
  _defaults: { [key: string]: { [key: string]: object | string | boolean } };
};

const FileAttributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: { model: 'Users', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  url: {
    type: DataTypes.VIRTUAL,
    get(this: FileModel): string {
      return `${process.env.API_URL}/files/${this.file}`;
    },
  },
  file: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  originalName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subType: {
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

export default class File extends Model<FileModel, FileStatic> {
  readonly id: number;

  readonly userId: number;

  readonly file: string;

  readonly originalName: string;

  readonly type: string;

  readonly subType: string;

  readonly deleted: boolean;

  readonly createdAt: Date;

  readonly upatedAt: Date;
}

export const factory = (sequelize: Sequelize): void =>
  File.init(FileAttributes, { sequelize, tableName: 'Files' });

export const associate = (models: {
  [key: string]: ModelCtor<Model>;
}): void => {
  File.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user',
  });
};
