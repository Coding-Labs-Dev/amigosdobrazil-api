import express, { Express } from 'express';
import cors from 'cors';
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
    this.server.use(cors());
    this.server.use(express.json());
    if (process.env.NODE_ENV !== 'production')
      this.server.use((req, _res, next) => {
        const { method, url, params, body } = req;
        console.dir({ method, url, params, body }, { depth: 3 });
        next();
      });
  }

  routes(): void {
    this.server.use(routes);
  }

  globalEHandler(): void {
    this.server.use(HttpExceptionHandler);
  }
}

export const { server } = new App();

export default serverless(server, { binary: ['image/*', 'video/*'] });
