import {
  Sequelize,
  Model,
  ModelCtor,
  DataTypes,
  BuildOptions,
} from 'sequelize';

export interface ItineraryAttributes {
  readonly id: number;
  readonly tripId: number;
  readonly title: string;
  readonly description: string;
  readonly order: number;
  readonly mainDestination: boolean;
  readonly mainDestinationTitle: string;
  readonly deleted: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

type ItineraryModel = Model & ItineraryAttributes;

type ItineraryStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ItineraryModel;
} & {
  _defaults: { [key: string]: { [key: string]: object | string | boolean } };
};

const ItineraryAttributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  tripId: {
    type: DataTypes.INTEGER,
    references: { model: 'Trips', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mainDestination: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  mainDestinationTitle: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  createdAt: { type: DataTypes.DATE, allowNull: false },
  updatedAt: { type: DataTypes.DATE, allowNull: false },
};

export default class Itinerary extends Model<ItineraryModel, ItineraryStatic> {
  readonly id: number;

  readonly tripId: number;

  readonly title: string;

  readonly description: string;

  readonly order: number;

  readonly mainDestination: boolean;

  readonly mainDestinationTitle: string;

  readonly deleted: boolean;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}

export const factory = (sequelize: Sequelize): void =>
  Itinerary.init(ItineraryAttributes, { sequelize, tableName: 'Itineraries' });

export const associate = (models: {
  [key: string]: ModelCtor<Model>;
}): void => {
  Itinerary.belongsTo(models.Trip, {
    foreignKey: 'tripId',
    as: 'trip',
  });
};
