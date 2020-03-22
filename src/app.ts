import express, { Express } from 'express';
import serverless from 'serverless-http';
import routes from './routes';
import HttpExceptionHandler from './app/middlewares/HttpExceptionMiddleware';

import './database';

class App {
  public server: Express;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.globalEHandler();
  }

  middlewares(): void {
    this.server.use(express.json());
  }

  routes(): void {
    this.server.use(routes);
  }

  globalEHandler(): void {
    this.server.use(HttpExceptionHandler);
  }
}

export const { server } = new App();

export default serverless(server);