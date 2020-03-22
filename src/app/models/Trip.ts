import {
  Sequelize,
  Model,
  ModelCtor,
  DataTypes,
  BuildOptions,
} from 'sequelize';

export interface TripAttributes {
  readonly id: number;
  readonly slug: string;
  readonly featured: boolean;
  readonly title: string;
  readonly subTitle: string;
  readonly backgrundId: number;
  readonly backgroundPosition:
    | 'left top'
    | 'left center'
    | 'left bottom'
    | 'right top'
    | 'right center'
    | 'right bottom'
    | 'center top'
    | 'center center'
    | 'center bottom';
  readonly titlePosition: 'top' | 'center' | 'bottom';
  readonly days: number;
  readonly minSize: number;
  readonly destinationsQty: number;
  readonly departure: Date;
  readonly description: object;
  readonly deleted: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

type TripModel = Model & TripAttributes;

type TripStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): TripModel;
} & {
  _defaults: { [key: string]: { [key: string]: object | string | boolean } };
};

const TripAttributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  featured: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  subTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  backgroundId: {
    type: DataTypes.INTEGER,
    references: { model: 'Files', key: 'id' },
    allowNull: false,
  },
  backgroundPosition: {
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
  titlePosition: {
    type: DataTypes.ENUM('top', 'center', 'bottom'),
    allowNull: false,
    defaultValue: 'center',
  },
  days: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  minSize: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  destinationsQty: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  departure: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  description: {
    type: DataTypes.JSON,
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

export default class Trip extends Model<TripModel, TripStatic> {
  readonly id: number;

  readonly slug: string;

  readonly featured: boolean;

  readonly title: string;

  readonly subTitle: string;

  readonly backgrundId: number;

  readonly backgroundPosition:
    | 'left top'
    | 'left center'
    | 'left bottom'
    | 'right top'
    | 'right center'
    | 'right bottom'
    | 'center top'
    | 'center center'
    | 'center bottom';

  readonly titlePosition: 'top' | 'center' | 'bottom';

  readonly days: number;

  readonly minSize: number;

  readonly destinationsQty: number;

  readonly departure: Date;

  readonly description: object;

  readonly deleted: boolean;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}

export const factory = (sequelize: Sequelize): void =>
  Trip.init(TripAttributes, { sequelize, tableName: 'Trips' });

export const associate = (models: {
  [key: string]: ModelCtor<Model>;
}): void => {
  Trip.hasMany(models.PaymentPlan, {
    foreignKey: 'tripId',
    as: 'paymentPlans',
  });
  Trip.belongsToMany(models.Include, {
    through: 'TripInclude',
    foreignKey: 'tripId',
    timestamps: false,
    as: 'includes',
  });
};
