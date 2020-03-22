import { Sequelize } from 'sequelize';

import databaseConfig from '@config/database';

import * as Models from '@models/index';

import {
  factory as FileFactory,
  associate as FileAssociate,
} from '@models/File';

import { factory as FormContactFactory } from '@models/FormContact';
import { factory as ClientFactory } from '@models/Client';
import { factory as SettingFactory } from '@models/Setting';
import {
  factory as TestimonialFactory,
  associate as TestimonialAssociate,
} from '@models/Testimonial';
import {
  factory as HeroFactory,
  associate as HeroAssociate,
} from '@models/Hero';
import { factory as UserFactory } from '@models/User';
import { factory as WhyUsFactory } from '@models/WhyUs';
import {
  factory as TripFactory,
  associate as TripAssociate,
} from '@models/Trip';
import {
  factory as PaymentPlanFactory,
  associate as PaymentPlanAssociate,
} from '@models/PaymentPlan';
import {
  factory as ItineraryFactory,
  associate as ItineraryAssociate,
} from '@models/Itinerary';
import {
  factory as IncludeFactory,
  associate as IncludeAssociate,
} from '@models/Include';

const models = [
  FileFactory,
  FormContactFactory,
  ClientFactory,
  SettingFactory,
  TestimonialFactory,
  UserFactory,
  WhyUsFactory,
  HeroFactory,
  TripFactory,
  PaymentPlanFactory,
  ItineraryFactory,
  IncludeFactory,
];

const associates = [
  FileAssociate,
  TestimonialAssociate,
  HeroAssociate,
  TripAssociate,
  PaymentPlanAssociate,
  ItineraryAssociate,
  IncludeAssociate,
];

class Database {
  public connection: Sequelize;

  constructor() {
    this.init();
  }

  async init(): Promise<void> {
    this.connection = new Sequelize(databaseConfig);

    models.forEach(model => model(this.connection));
    associates.forEach(associate => associate(Models));
  }
}

export default new Database().connection;
