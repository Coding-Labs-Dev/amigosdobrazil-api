import {
  Sequelize,
  Model,
  ModelCtor,
  DataTypes,
  BuildOptions,
} from 'sequelize';

export interface PhotoAttributes {
  readonly id: number;
  readonly fileId: number;
  readonly galleryId: number;
  readonly caption: string;

  readonly deleted: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

type PhotoModel = Model & PhotoAttributes;

type PhotoStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): PhotoModel;
} & {
  _defaults: { [key: string]: { [key: string]: object | string | boolean } };
};

const PhotoAttributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  fileId: {
    type: DataTypes.INTEGER,
    references: { model: 'Files', key: 'id' },
    allowNull: false,
  },
  galleryId: {
    type: DataTypes.INTEGER,
    references: { model: 'Galleries', key: 'id' },
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

export default class Photo extends Model<PhotoModel, PhotoStatic> {
  readonly id: number;

  readonly fileId: number;

  readonly galleryId: number;

  readonly caption: string;

  readonly deleted: boolean;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}

export const factory = (sequelize: Sequelize): void =>
  Photo.init(PhotoAttributes, { sequelize, tableName: 'Photos' });

export const associate = (models: {
  [key: string]: ModelCtor<Model>;
}): void => {
  Photo.belongsTo(models.File, {
    foreignKey: 'fileId',
    as: 'photo',
  });
  Photo.belongsTo(models.Gallery, {
    foreignKey: 'galleryId',
    as: 'gallery',
  });
};
