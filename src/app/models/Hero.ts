import {
  Sequelize,
  Model,
  ModelCtor,
  DataTypes,
  BuildOptions,
} from 'sequelize';

export interface HeroAttributes {
  readonly id: number;
  readonly backgroundId: number;
  readonly position:
    | 'left top'
    | 'left center'
    | 'left bottom'
    | 'right top'
    | 'right center'
    | 'right bottom'
    | 'center top'
    | 'center center'
    | 'center bottom';
  readonly opacity: number;
  readonly deleted: boolean;
  readonly createdAt: boolean;
  readonly upatedAt: boolean;
}

type HeroModel = Model & HeroAttributes;

type HeroStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): HeroModel;
} & {
  _defaults: { [key: string]: { [key: string]: object | string | boolean } };
};

const HeroAttributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  backgroundId: {
    type: DataTypes.INTEGER,
    references: { model: 'Files', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  position: {
    type: DataTypes.ENUM(
      'left top',
      'left center',
      'left bottom',
      'right top',
      'right center',
      'right bottom',
      'center top',
      'center center',
      'center bottom',
    ),
    allowNull: false,
    defaultValue: 'center center',
  },
  opacity: {
    type: DataTypes.DECIMAL(1),
    allowNull: false,
    defaultValue: 1,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: { type: DataTypes.DATE, allowNull: false },
  updatedAt: { type: DataTypes.DATE, allowNull: false },
};

export default class Hero extends Model<HeroModel, HeroStatic> {
  readonly id: number;

  readonly backgroundId: number;

  readonly position:
    | 'left top'
    | 'left center'
    | 'left bottom'
    | 'right top'
    | 'right center'
    | 'right bottom'
    | 'center top'
    | 'center center'
    | 'center bottom';

  readonly opacity: number;

  readonly deleted: boolean;

  readonly createdAt: boolean;

  readonly upatedAt: boolean;
}

export const factory = (sequelize: Sequelize): void =>
  Hero.init(HeroAttributes, { sequelize, tableName: 'Heroes' });

export const associate = (models: {
  [key: string]: ModelCtor<Model>;
}): void => {
  Hero.belongsTo(models.File, {
    foreignKey: 'backgroundId',
    as: 'background',
  });
};
