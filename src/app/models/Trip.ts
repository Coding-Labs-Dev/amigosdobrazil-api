import {
  Sequelize,
  Model,
  ModelCtor,
  DataTypes,
  BuildOptions,
} from 'sequelize';

import slugify from 'slugify';
import moment from 'moment';

slugify.extend({
  '&': 'e',
});

moment.locale('pt');

export interface TripAttributes {
  readonly id: number;
  readonly slug: string;
  readonly featured: boolean;
  readonly title: string;
  readonly subTitle: string;
  readonly backgroundId: number;

  readonly background: string;
  readonly bannerId: number;
  readonly bannerPosition:
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
  readonly image: { url: string };
  readonly bannerImage: { url: string };

  readonly banner: {
    url: string;
    position:
      | 'left top'
      | 'left center'
      | 'left bottom'
      | 'right top'
      | 'right center'
      | 'right bottom'
      | 'center top'
      | 'center center'
      | 'center bottom';
  };
  readonly bannerOpacity: number;
  readonly active: boolean;
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
  bannerId: {
    type: DataTypes.INTEGER,
    references: { model: 'Files', key: 'id' },
    allowNull: false,
  },
  bannerPosition: {
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
  bannerOpacity: {
    type: DataTypes.DECIMAL(1, 1),
    allowNull: false,
    default: 0.8,
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
  date: {
    type: DataTypes.VIRTUAL,
    get(this: Trip): string {
      return moment(this.departure).format('MMMM/YYYY');
    },
  },
  background: {
    type: DataTypes.VIRTUAL,
    get(this: Trip): string {
      return this.image?.url;
    },
  },
  banner: {
    type: DataTypes.VIRTUAL,
    get(this: Trip): object {
      return {
        url: this.bannerImage?.url,
        position: this.bannerPosition,
        opacity: this.bannerOpacity,
      };
    },
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

export default class Trip extends Model<TripModel, TripStatic> {
  readonly id: number;

  public slug: string;

  readonly featured: boolean;

  readonly title: string;

  readonly subTitle: string;

  readonly backgroundId: number;

  readonly background: string;

  readonly bannerId: number;

  readonly bannerPosition:
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

  readonly image: { url: string };

  readonly bannerImage: { url: string };

  readonly banner: {
    url: string;
    position:
      | 'left top'
      | 'left center'
      | 'left bottom'
      | 'right top'
      | 'right center'
      | 'right bottom'
      | 'center top'
      | 'center center'
      | 'center bottom';
  };

  readonly bannerOpacity: number;

  readonly active: boolean;

  readonly deleted: boolean;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}

export const factory = (sequelize: Sequelize): void =>
  Trip.init(TripAttributes, {
    sequelize,
    tableName: 'Trips',
    hooks: {
      beforeValidate: (trip: Trip): void => {
        const { title, departure } = trip;
        const slug = slugify(
          `${title} ${moment(departure).format('DD-MM-YYYY')}`,
          {
            lower: true,
          },
        );
        // eslint-disable-next-line no-param-reassign
        trip.slug = slug;
      },
    },
  });

export const associate = (models: {
  [key: string]: ModelCtor<Model>;
}): void => {
  Trip.belongsTo(models.File, {
    foreignKey: 'backgroundId',
    as: 'image',
  });
  Trip.belongsTo(models.File, {
    foreignKey: 'bannerId',
    as: 'bannerImage',
  });
  Trip.hasMany(models.PaymentPlan, {
    foreignKey: 'tripId',
    as: 'paymentPlans',
  });
  Trip.hasMany(models.Itinerary, {
    foreignKey: 'tripId',
    as: 'itinerary',
  });
  Trip.belongsToMany(models.Include, {
    through: 'TripInclude',
    foreignKey: 'tripId',
    timestamps: false,
    as: 'includes',
  });
  Trip.belongsToMany(models.Document, {
    through: 'TripDocument',
    foreignKey: 'tripId',
    timestamps: false,
    as: 'documents',
  });
};
