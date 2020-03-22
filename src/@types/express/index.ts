// eslint-disable-next-line import/no-self-import
import 'express';

declare module 'express' {
  interface Request {
    auth?: {
      userId: number;
    };
  }
}
