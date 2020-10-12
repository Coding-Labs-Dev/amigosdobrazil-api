import {
  Sequelize,
  Model,
  ModelCtor,
  DataTypes,
  BuildOptions,
} from 'sequelize';

export interface DocumentAttributes {
  readonly id: number;
  readonly description: string;
  readonly deleted: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

type DocumentModel = Model & DocumentAttributes;

type DocumentStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): DocumentModel;
} & {
  _defaults: { [key: string]: { [key: string]: object | string | boolean } };
};

const DocumentAttributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  tripId: {
    type: DataTypes.INTEGER,
    references: { model: 'Trips', key: 'id' },
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

export default class Document extends Model<DocumentModel, DocumentStatic> {
  readonly id: number;

  readonly description: string;

  readonly deleted: boolean;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}

export const factory = (sequelize: Sequelize): void =>
  Document.init(DocumentAttributes, { sequelize, tableName: 'Documents' });

export const associate = (models: {
  [key: string]: ModelCtor<Model>;
}): void => {
  Document.belongsTo(models.Trip, {
    foreignKey: 'tripId',
    as: 'trips',
  });
};
