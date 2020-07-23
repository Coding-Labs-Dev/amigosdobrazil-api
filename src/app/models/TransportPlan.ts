import {
  Sequelize,
  Model,
  ModelCtor,
  DataTypes,
  BuildOptions,
} from 'sequelize';

export interface TransportPlanAttributes {
  readonly id: number;
  readonly tripId: number;
  readonly usd: number;
  readonly rate: number;
  readonly installmentsQty: number;
  readonly deleted: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

type TransportPlanModel = Model & TransportPlanAttributes;

type TransportPlanStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): TransportPlanModel;
} & {
  _defaults: { [key: string]: { [key: string]: object | string | boolean } };
};

const TransportPlanAttributes = {
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
  usd: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false,
  },
  rate: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false,
  },
  installmentsQty: {
    type: DataTypes.INTEGER,
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

export default class TransportPlan extends Model<
  TransportPlanModel,
  TransportPlanStatic
> {
  readonly id: number;

  readonly tripId: number;

  readonly date: Date;

  readonly usd: number;

  readonly brl: number;

  readonly downPayment: number;

  readonly installmentsQty: number;

  readonly installmentsValue: number;

  readonly deleted: boolean;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}

export const factory = (sequelize: Sequelize): void =>
  TransportPlan.init(TransportPlanAttributes, {
    sequelize,
    tableName: 'TransportPlans',
  });

export const associate = (models: {
  [key: string]: ModelCtor<Model>;
}): void => {
  TransportPlan.belongsTo(models.Trip, {
    foreignKey: 'tripId',
    as: 'trip',
  });
};
