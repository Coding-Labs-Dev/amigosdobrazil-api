import {
  Sequelize,
  Model,
  ModelCtor,
  DataTypes,
  BuildOptions,
} from 'sequelize';

import slugify from 'slugify';
import { Photo } from '.';

slugify.extend({
  '&': 'e',
});

export interface GalleryAttributes {
  readonly id: number;
  readonly title: string;
  readonly slug: string;
  readonly photos: Array<Photo>;
  readonly active: boolean;

  readonly deleted: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

type GalleryModel = Model & GalleryAttributes;

type GalleryStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): GalleryModel;
} & {
  _defaults: { [key: string]: { [key: string]: object | string | boolean } };
};

const GalleryAttributes = {
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
  slug: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  active: {
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

export default class Gallery extends Model<GalleryModel, GalleryStatic> {
  readonly id: number;

  readonly title: string;

  public slug: string;

  readonly photos: Array<Photo>;

  readonly active: boolean;

  readonly deleted: boolean;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}

export const factory = (sequelize: Sequelize): void =>
  Gallery.init(GalleryAttributes, {
    sequelize,
    tableName: 'Galleries',
    hooks: {
      beforeValidate: (gallery: Gallery): void => {
        const { title } = gallery;
        const slug = slugify(title, {
          lower: true,
        });
        // eslint-disable-next-line no-param-reassign
        gallery.slug = slug;
      },
    },
  });

export const associate = (models: {
  [key: string]: ModelCtor<Model>;
}): void => {
  Gallery.hasMany(models.Photo, {
    foreignKey: 'galleryId',
    as: 'photos',
  });
};
