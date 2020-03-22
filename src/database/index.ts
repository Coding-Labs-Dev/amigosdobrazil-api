import { Sequelize } from 'sequelize';

import databaseConfig from '@config/database';

// import * as Models from '@models/index';

import {
  factory as ContactFactory,
  // associate as ContactAssociate,
} from '@models/Contact';

const models = [ContactFactory];

// const associates = [ContactAssociate];

class Database {
  public connection: Sequelize;

  constructor() {
    this.init();
  }

  async init(): Promise<void> {
    this.connection = new Sequelize(databaseConfig);

    models.forEach(model => model(this.connection));
    // associates.forEach(associate => associate(Models));
  }
}

export default new Database().connection;
