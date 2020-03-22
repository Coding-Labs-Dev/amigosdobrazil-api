import {
  Sequelize,
  Model,
  ModelCtor,
  DataTypes,
  BuildOptions,
} from 'sequelize';

export interface TestimonialAttributes {
  readonly id: number;
  readonly clientId: number;
  readonly videoId: number;
  readonly posterId: number;
  readonly deleted: boolean;
  readonly createdAt: boolean;
  readonly upatedAt: boolean;
}

type TestimonialModel = Model & TestimonialAttributes;

type TestimonialStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): TestimonialModel;
} & {
  _defaults: { [key: string]: { [key: string]: object | string | boolean } };
};

const TestimonialAttributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  clientId: {
    type: DataTypes.INTEGER,
    references: { model: 'Clients', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  videoId: {
    type: DataTypes.INTEGER,
    references: { model: 'Files', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  posterId: {
    type: DataTypes.INTEGER,
    references: { model: 'Files', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: { type: DataTypes.DATE, allowNull: false },
  updatedAt: { type: DataTypes.DATE, allowNull: false },
};

export default class Testimonial extends Model<
  TestimonialModel,
  TestimonialStatic
> {
  readonly id: number;

  readonly clientId: number;

  readonly videoId: number;

  readonly posterId: number;

  readonly deleted: boolean;

  readonly createdAt: boolean;

  readonly upatedAt: boolean;
}

export const factory = (sequelize: Sequelize): void =>
  Testimonial.init(TestimonialAttributes, {
    sequelize,
    tableName: 'Testimonials',
  });

export const associate = (models: {
  [key: string]: ModelCtor<Model>;
}): void => {
  Testimonial.belongsTo(models.File, {
    foreignKey: 'videoId',
    as: 'video',
  });
  Testimonial.belongsTo(models.File, {
    foreignKey: 'posterId',
    as: 'poster',
  });
};
