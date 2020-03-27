import {
  Sequelize,
  Model,
  ModelCtor,
  DataTypes,
  BuildOptions,
} from 'sequelize';

export interface PaymentPlanAttributes {
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

type PaymentPlanModel = Model & PaymentPlanAttributes;

type PaymentPlanStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): PaymentPlanModel;
} & {
  _defaults: { [key: string]: { [key: string]: object | string | boolean } };
};

const PaymentPlanAttributes = {
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
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  usd: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false,
  },
  brl: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false,
  },
  downPayment: {
    type: DataTypes.DECIMAL(10, 4),
    allowNull: false,
  },
  installmentsQty: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  installmentsValue: {
    type: DataTypes.DECIMAL(10, 4),
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

export default class PaymentPlan extends Model<
  PaymentPlanModel,
  PaymentPlanStatic
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
  PaymentPlan.init(PaymentPlanAttributes, {
    sequelize,
    tableName: 'PaymentPlans',
  });

export const associate = (models: {
  [key: string]: ModelCtor<Model>;
}): void => {
  PaymentPlan.belongsTo(models.Trip, {
    foreignKey: 'tripId',
    as: 'trip',
  });
};
