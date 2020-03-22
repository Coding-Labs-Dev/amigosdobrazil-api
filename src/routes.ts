import { Router, Request, Response, NextFunction } from 'express';

/**
 * Middlewares
 */

import UploadFileMiddleware from '@middlewares/UploadFileMiddleware';
import ValidatorMiddleware from '@middlewares/ValidatorMiddleware';

/**
 * Controllers
 */

import UploadFileController from '@controllers/UploadFileController';

/**
 * Validators
 */

import UploadValidator from '@validators/UploadValidator';

function wrapper(
  fn: Function,
): (req: Request, res: Response, next: NextFunction) => void {
  const wrapperFn = (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch(next);
  };
  return wrapperFn;
}

const routes = Router();

routes.get('/', (_req, res) => res.json({ response: 'Hello World' }));

routes.post(
  '/upload/:type',
  ValidatorMiddleware(UploadValidator),
  UploadFileMiddleware.single('file'),
  wrapper(UploadFileController.store),
);

export default routes;
